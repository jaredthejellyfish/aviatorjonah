"use client";
// sidebar-client.tsx (Client Components)
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCourseAddModuleMutation } from "@/hooks/useCourseAddModuleMutation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { useCourseDeleteModuleMutation } from "@/hooks/useCourseDeleteModuleMutation";
import { useCourseAddLessonMutation } from "@/hooks/useCourseAddLessonMutation";
import { useCourseDeleteLessonMutation } from "@/hooks/useCourseDeleteLessonMutation";

const fadeInUpVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const fadeInQuickVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const rotateVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

// -------------------------------------
// ChapterLesson
// -------------------------------------
export function ChapterLesson({
  lesson,
  currentLessonTitle,
}: {
  lesson: {
    id: string;
    title: string;
    completed: boolean;
    slug: string;
    moduleSlug: string;
    courseSlug: string;
  };
  currentLessonTitle?: string;
}) {
  const { mutate: deleteLesson } = useCourseDeleteLessonMutation();
  const [moduleTitleInput, setModuleTitleInput] = useState("");
  const [currentText, setCurrentText] = useState("");

  const doesTextMatch = useMemo(() => {
    return currentText === "delete my lesson";
  }, [currentText]);

  const handleDelete = (lessonId: string) => {
    deleteLesson({
      lessonId: lessonId,
    });
  };

  return (
    <motion.div
      variants={fadeInQuickVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className={cn(
        lesson.title === currentLessonTitle && "bg-primary/10",
        "group flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <Link href={`/content-studio/edit/${lesson.courseSlug}/${lesson.slug}`}>
        <span className="truncate w-4/5 text-sm font-medium group-hover:text-primary">
          {lesson.title}
        </span>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex items-center justify-center p-1.5 rounded-full bg-red-400/40">
            <Trash className="w-3.5 h-3.5 text-primary" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-2xl p-6 gap-6 border-neutral-800">
          <AlertDialogHeader className="gap-2">
            <AlertDialogTitle className="text-3xl font-normal">
              Delete Lesson
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-normal text-neutral-400">
              This lesson will be deleted, along with all of its Content,
              Content, Student Progress, Comments, and Associated Data.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-md p-4 text-sm">
            Warning: This action is not reversible. Please be certain.
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-neutral-400">
                Enter the lesson title{" "}
                <span className="text-neutral-200">{lesson.title}</span> to
                continue:
              </p>
              <Input
                value={moduleTitleInput}
                onChange={(e) => setModuleTitleInput(e.target.value)}
                className="bg-neutral-900 border-neutral-800 h-12"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-neutral-400">
                To verify, type{" "}
                <span className="text-neutral-200">delete my lesson</span>{" "}
                below:
              </p>
              <Input
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                className="bg-neutral-900 border-neutral-800 h-12"
              />
            </div>
          </div>

          <AlertDialogFooter className="gap-3 sm:gap-3">
            <AlertDialogCancel className="h-11 px-6 bg-transparent border-neutral-800 hover:bg-neutral-900 transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(lesson.id)}
              disabled={!doesTextMatch || moduleTitleInput !== lesson.title}
              className={cn(
                "h-11 px-6 bg-white text-black hover:bg-neutral-200 transition-colors",
                (!doesTextMatch || moduleTitleInput !== lesson.title) &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

// -------------------------------------
// ChapterSection
// -------------------------------------
export function ChapterSection({
  lessons,
  chapterTitle,
  chapterNumber,
  defaultOpen,
  currentLessonTitle,
  moduleId,
}: {
  lessons: {
    id: string;
    title: string;
    completed: boolean;
    slug: string;
    moduleSlug: string;
    courseSlug: string;
  }[];
  chapterTitle: string;
  chapterNumber: number;
  defaultOpen?: boolean;
  currentLessonTitle?: string;
  moduleId: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
  const [moduleTitleInput, setModuleTitleInput] = useState("");
  const [currentText, setCurrentText] = useState("");

  const { mutate: deleteModule } = useCourseDeleteModuleMutation();

  const handleDelete = (moduleId: string) => {
    deleteModule({
      moduleId: moduleId,
    });
  };

  const doesTextMatch = useMemo(() => {
    return currentText === "delete my module";
  }, [currentText]);

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <HoverCard>
        <HoverCardTrigger>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-primary/5 transition-colors rounded-md group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-start max-w-[80%]">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Chapter {chapterNumber}
              </span>

              <h2 className="text-sm font-semibold truncate w-full text-left group-hover:text-primary transition-colors">
                {chapterTitle}
              </h2>
            </div>
            <motion.div
              variants={rotateVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.button>
        </HoverCardTrigger>

        <HoverCardContent className="p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Chapter</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl p-6 gap-6 border-neutral-800">
              <AlertDialogHeader className="gap-2">
                <AlertDialogTitle className="text-3xl font-normal">
                  Delete Chapter
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base font-normal text-neutral-400">
                  This chapter will be deleted, along with all of its Lessons,
                  Content, Student Progress, Comments, and Associated Data.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-md p-4 text-sm">
                Warning: This action is not reversible. Please be certain.
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm text-neutral-400">
                    Enter the chapter title{" "}
                    <span className="text-neutral-200">{chapterTitle}</span> to
                    continue:
                  </p>
                  <Input
                    value={moduleTitleInput}
                    onChange={(e) => setModuleTitleInput(e.target.value)}
                    className="bg-neutral-900 border-neutral-800 h-12"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-neutral-400">
                    To verify, type{" "}
                    <span className="text-neutral-200">delete my module</span>{" "}
                    below:
                  </p>
                  <Input
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    className="bg-neutral-900 border-neutral-800 h-12"
                  />
                </div>
              </div>

              <AlertDialogFooter className="gap-3 sm:gap-3">
                <AlertDialogCancel className="h-11 px-6 bg-transparent border-neutral-800 hover:bg-neutral-900 transition-colors">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(moduleId)}
                  disabled={!doesTextMatch || moduleTitleInput !== chapterTitle}
                  className={cn(
                    "h-11 px-6 bg-white text-black hover:bg-neutral-200 transition-colors",
                    (!doesTextMatch || moduleTitleInput !== chapterTitle) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </HoverCardContent>
      </HoverCard>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 space-y-0.5 pl-4 overflow-hidden"
          >
            <AddLessonButton moduleId={moduleId} />
            {lessons.map((lesson) => (
              <ChapterLesson
                key={lesson.slug}
                lesson={lesson}
                currentLessonTitle={currentLessonTitle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// -------------------------------------
// AddModuleButton
// -------------------------------------
function AddModuleButton({
  courseId,
  moduleCount,
}: {
  courseId: string;
  moduleCount: number;
}) {
  const { mutate: addModule } = useCourseAddModuleMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    console.log(title, description, courseId, moduleCount);

    addModule({ title, description, courseId, orderIndex: moduleCount + 1 });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3 }}
          className="mt-0"
        >
          <motion.button
            className="w-full flex items-center justify-between px-4 bg-primary/5 transition-colors group py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-start max-w-[80%]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <h2 className="text-sm font-semibold truncate w-full text-left group-hover:text-primary transition-colors">
                    Add Chapter
                  </h2>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  <p className="text-sm">Add Chapter</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Plus className="w-4 h-4 text-muted-foreground" />
            </div>
          </motion.button>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Chapter</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add a new chapter to your course.</DialogDescription>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add Chapter</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddLessonButton({ moduleId }: { moduleId: string }) {
  const { mutate: addLesson } = useCourseAddLessonMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    addLesson({ title, description, moduleId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          variants={fadeInQuickVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="mr-3"
        >
          <div
            className={cn(
              "group flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "bg-primary/5"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate w-4/5 text-sm font-medium group-hover:text-primary">
                  Add Lesson
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Add Lesson</p>
              </TooltipContent>

              <div className="flex items-center justify-center p-1.5 rounded-full">
                <Plus className="w-3.5 h-3.5 text-primary" />
              </div>
            </Tooltip>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Lesson</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add a new lesson to your chapter.</DialogDescription>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add Lesson</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// -------------------------------------
// SidebarContent
// -------------------------------------
export function SidebarContent({
  courseModules,
  courseTitle,
  className,
  currentModuleTitle,
  currentLessonTitle,
  courseSlug,
  courseId,
}: {
  className?: string;
  courseTitle: string;
  currentModuleTitle?: string;
  currentLessonTitle?: string;
  courseId: string;
  courseModules: {
    id: string;
    lessons: {
      id: string;
      title: string;
      completed: boolean;
      slug: string;
      moduleSlug: string;
      courseSlug: string;
    }[];
    chapterTitle: string;
    chapterNumber: number;
  }[];
  courseSlug: string;
}) {
  return (
    <TooltipProvider>
      <Tabs
        defaultValue="content"
        className={cn(
          "md:h-[calc(100vh-64px)] h-full pb-6 md:pb-0 overflow-scroll flex flex-col bg-background",
          className
        )}
      >
        {/* Course title (visible on md+) */}
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 border-b border-border p-4 hidden md:block"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/content-studio/edit/${courseSlug}`}>
                <h1 className="text-xl font-bold w-full max-w-[250px] truncate">
                  {courseTitle}
                </h1>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <p className="text-sm">{courseTitle}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* Tabs header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-shrink-0 bg-background p-2 border-b border-border"
        >
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">
              Content
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex-1">
              Resources
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* Tabs content */}
        <motion.div
          variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-grow overflow-y-auto"
        >
          <TabsContent value="content">
            <AddModuleButton
              courseId={courseId}
              moduleCount={courseModules.length}
            />

            {courseModules?.map((moduleItem) => (
              <ChapterSection
                moduleId={moduleItem.id}
                key={moduleItem.id}
                lessons={moduleItem.lessons}
                chapterTitle={moduleItem.chapterTitle}
                chapterNumber={moduleItem.chapterNumber}
                currentLessonTitle={currentLessonTitle}
                defaultOpen={
                  currentModuleTitle
                    ? currentModuleTitle === moduleItem.chapterTitle
                    : false
                }
              />
            ))}
          </TabsContent>

          <TabsContent value="resources" className="p-4">
            <p className="text-sm text-muted-foreground">
              Resources content goes here.
            </p>
          </TabsContent>
        </motion.div>
      </Tabs>
    </TooltipProvider>
  );
}

// -------------------------------------
// DrawerSidebar
// -------------------------------------
export function DrawerSidebar({
  courseTitle,
  courseModules,
  currentModuleTitle,
  currentLessonTitle,
  courseSlug,
  courseId,
}: {
  courseTitle: string;
  currentModuleTitle?: string;
  currentLessonTitle?: string;
  courseModules: {
    id: string;
    lessons: {
      id: string;
      title: string;
      completed: boolean;
      slug: string;
      moduleSlug: string;
      courseSlug: string;
    }[];
    chapterTitle: string;
    chapterNumber: number;
  }[];
  courseSlug: string;
  courseId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Close the drawer automatically if screen is resized to >=768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -360 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-20 left-4 z-30"
        >
          <Button variant="outline" className="w-10 h-10 md:hidden">
            <Menu className="w-full h-full" />
          </Button>
        </motion.div>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <Link href={`/course/${courseSlug}`}>
            <DrawerTitle>{courseTitle}</DrawerTitle>
          </Link>
        </DrawerHeader>

        {/* Reuse the SidebarContent inside the drawer */}
        <SidebarContent
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          courseModules={courseModules}
          courseId={courseId}
          currentModuleTitle={currentModuleTitle}
          currentLessonTitle={currentLessonTitle}
        />
      </DrawerContent>
    </Drawer>
  );
}
