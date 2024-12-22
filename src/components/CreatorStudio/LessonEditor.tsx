"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Code,
  Quote,
  Save,
  Eye,
  Edit2,
} from "lucide-react";
import { marked } from "marked";
import { useCourseUpdateLessonMutation } from "@/hooks/useCourseUpdateLessonMutation";
import { Input } from "../ui/input";

// Define types for editor controls
interface EditorControl {
  icon: React.ReactNode;
  markdown: string;
  label: string;
  shortcut?: string;
}

interface EditorControlsProps {
  onInsert: (markdown: string) => void;
  disabled?: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({
  onInsert,
  disabled,
}) => {
  const controls: EditorControl[] = [
    {
      icon: <Bold size={16} />,
      markdown: "**Bold**",
      label: "Bold",
      shortcut: "Ctrl+B",
    },
    {
      icon: <Italic size={16} />,
      markdown: "*Italic*",
      label: "Italic",
      shortcut: "Ctrl+I",
    },
    {
      icon: <List size={16} />,
      markdown: "\n- List item\n",
      label: "Unordered List",
    },
    {
      icon: <ListOrdered size={16} />,
      markdown: "\n1. List item\n",
      label: "Ordered List",
    },
    {
      icon: <Heading2 size={16} />,
      markdown: "\n## Heading 2\n",
      label: "Heading 2",
    },
    {
      icon: <Heading3 size={16} />,
      markdown: "\n### Heading 3\n",
      label: "Heading 3",
    },
    { icon: <Code size={16} />, markdown: "`Code`", label: "Inline Code" },
    {
      icon: <Quote size={16} />,
      markdown: "\n> Blockquote\n",
      label: "Blockquote",
    },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 p-2 bg-muted/40 rounded-lg mb-3">
      {controls.map((control, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          onClick={() => onInsert(control.markdown)}
          title={`${control.label}${
            control.shortcut ? ` (${control.shortcut})` : ""
          }`}
          className="h-8 w-8 p-0 hover:bg-muted"
          disabled={disabled}
        >
          {control.icon}
        </Button>
      ))}
    </div>
  );
};

interface LessonEditorProps {
  initialContent: string;
  onSave?: (content: string) => Promise<void>;
  lessonId: string;
  courseSlug: string;
  lessonSlug: string;
  lessonTitle: string;
}

const LessonEditor: React.FC<LessonEditorProps> = ({
  initialContent,
  lessonId,
  lessonTitle: initialLessonTitle,
}) => {
  const [content, setContent] = useState(initialContent || "");
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [lessonTitle, setLessonTitle] = useState(initialLessonTitle);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: updateLesson } = useCourseUpdateLessonMutation();

  // -----------------------------------------------------
  // 1. Define callbacks (insertMarkdown, handleSave) first
  // -----------------------------------------------------

  /**
   * Inserts Markdown into the current cursor/selection position
   */
  const insertMarkdown = useCallback(
    (markdown: string): void => {
      if (!textareaRef.current) return;

      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      let newContent = content;
      let newCursorPosition = start;

      // Handle different markdown insertions
      if (markdown === "**Bold**" || markdown === "*Italic*") {
        // e.g. "**Bold**" => wrap selection in "**" if something is selected
        const wrapper = markdown.charAt(0);
        const wrapperLength = markdown.match(/^[*]+/)?.[0].length || 0;
        if (selectedText) {
          newContent =
            content.substring(0, start) +
            wrapper.repeat(wrapperLength) +
            selectedText +
            wrapper.repeat(wrapperLength) +
            content.substring(end);
          newCursorPosition = end + wrapperLength * 2;
        } else {
          newContent =
            content.substring(0, start) + markdown + content.substring(end);
          newCursorPosition = start + wrapperLength;
        }
      } else {
        newContent =
          content.substring(0, start) + markdown + content.substring(end);
        newCursorPosition = start + markdown.length;
      }

      setContent(newContent);
      setUnsavedChanges(true);

      // Restore focus and cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    },
    [content]
  );

  /**
   * Saves the content to the server using the updateLesson mutation
   */
  const handleSave = useCallback(async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      console.log("lessonTitle", lessonTitle);
      updateLesson({
        lessonId,
        content,
        title: lessonTitle,
      });
    } finally {
      setIsSaving(false);
    }
  }, [content, isSaving, updateLesson, lessonId, lessonTitle]);

  // -----------------------------------------------------
  // 2. Now define any effects that rely on these callbacks
  // -----------------------------------------------------

  // Prevent form submission
  useEffect(() => {
    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("submit", handleSubmit);
    return () => document.removeEventListener("submit", handleSubmit);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && activeTab === "edit") {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            e.stopPropagation();
            insertMarkdown("**Bold**");
            break;
          case "i":
            e.preventDefault();
            e.stopPropagation();
            insertMarkdown("*Italic*");
            break;
          case "s":
            e.preventDefault();
            e.stopPropagation();
            handleSave();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
    // Include dependencies that affect the logic inside
  }, [activeTab, insertMarkdown, handleSave]);

  // Warn about unsaved changes when leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

  // Parse markdown with sanitization
  const parsedContent = useCallback(() => {
    try {
      const renderer = new marked.Renderer();
      return { __html: marked(content, { renderer }) };
    } catch (error) {
      console.error("Markdown parsing error:", error);
      return { __html: "<p>Error parsing markdown content</p>" };
    }
  }, [content]);

  return (
    <div className="p-6">
      <Input
        value={lessonTitle}
        className="text-3xl h-9 font-bold mb-2 p-0 w-4/5"
        onChange={(e) => {
          setLessonTitle(e.target.value);
          setUnsavedChanges(true);
        }}
        style={{ fontSize: "2.25rem" }}
        placeholder="Lesson Title"
      />
      <div className="min-h-screen">
        <div className="container max-w-6xl py-6">
          <div className="flex flex-col space-y-6">
            <div className="rounded-lg border border-border bg-card">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                  <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                    <TabsTrigger value="edit" className="flex items-center">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editor
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                    disabled={isSaving || !unsavedChanges}
                    type="button"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="p-4">
                  <TabsContent value="edit" className="mt-0">
                    <EditorControls
                      onInsert={insertMarkdown}
                      disabled={isSaving}
                    />
                    <Textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                        setUnsavedChanges(true);
                      }}
                      name="content"
                      className="min-h-[600px] w-full font-mono text-sm bg-background border-muted"
                      placeholder="Enter your lesson content using Markdown..."
                      disabled={isSaving}
                    />
                  </TabsContent>

                  <TabsContent value="preview" className="mt-0">
                    <div
                      className="min-h-[600px] w-full p-4 border border-border rounded-md bg-background prose dark:prose-invert prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-blockquote:text-muted-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-muted-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground"
                      dangerouslySetInnerHTML={parsedContent()}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonEditor;
