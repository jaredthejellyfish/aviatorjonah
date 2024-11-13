export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      assignments: {
        Row: {
          course_id: string | null;
          created_at: string | null;
          description: string | null;
          due_date: string | null;
          id: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          course_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      bookmarked_courses: {
        Row: {
          course_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          course_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarked_courses_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          category: string | null;
          completion_time: number | null;
          created_at: string | null;
          description: string | null;
          draft: boolean;
          id: string;
          image: string | null;
          instructor_id: string;
          level: string | null;
          price: number | null;
          slug: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          category?: string | null;
          completion_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          draft?: boolean;
          id?: string;
          image?: string | null;
          instructor_id: string;
          level?: string | null;
          price?: number | null;
          slug?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          category?: string | null;
          completion_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          draft?: boolean;
          id?: string;
          image?: string | null;
          instructor_id?: string;
          level?: string | null;
          price?: number | null;
          slug?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      enrollments: {
        Row: {
          course_id: string;
          enrollment_date: string;
          id: string;
          user_id: string;
        };
        Insert: {
          course_id: string;
          enrollment_date?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          course_id?: string;
          enrollment_date?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      lessons: {
        Row: {
          content: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          module_id: string | null;
          order_index: number;
          reading_time: number | null;
          slug: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          module_id?: string | null;
          order_index: number;
          reading_time?: number | null;
          slug?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          module_id?: string | null;
          order_index?: number;
          reading_time?: number | null;
          slug?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      modules: {
        Row: {
          completion_time: number | null;
          course_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          order_index: number;
          slug: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          completion_time?: number | null;
          course_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          order_index: number;
          slug?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          completion_time?: number | null;
          course_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          order_index?: number;
          slug?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      progress: {
        Row: {
          completed: boolean | null;
          completed_at: string | null;
          course_id: string;
          feedback: string | null;
          id: string;
          lesson_id: string | null;
          takeaways: string;
          user_id: string;
        };
        Insert: {
          completed?: boolean | null;
          completed_at?: string | null;
          course_id: string;
          feedback?: string | null;
          id?: string;
          lesson_id?: string | null;
          takeaways: string;
          user_id: string;
        };
        Update: {
          completed?: boolean | null;
          completed_at?: string | null;
          course_id?: string;
          feedback?: string | null;
          id?: string;
          lesson_id?: string | null;
          takeaways?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "progress_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons_public";
            referencedColumns: ["id"];
          },
        ];
      };
      submissions: {
        Row: {
          assignment_id: string | null;
          content: string | null;
          feedback: string | null;
          grade: number | null;
          id: string;
          submitted_at: string | null;
          user_id: string;
        };
        Insert: {
          assignment_id?: string | null;
          content?: string | null;
          feedback?: string | null;
          grade?: number | null;
          id?: string;
          submitted_at?: string | null;
          user_id?: string;
        };
        Update: {
          assignment_id?: string | null;
          content?: string | null;
          feedback?: string | null;
          grade?: number | null;
          id?: string;
          submitted_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey";
            columns: ["assignment_id"];
            isOneToOne: false;
            referencedRelation: "assignments";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      lessons_public: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string | null;
          module_id: string | null;
          order_index: number | null;
          reading_time: number | null;
          slug: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string | null;
          module_id?: string | null;
          order_index?: number | null;
          reading_time?: number | null;
          slug?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string | null;
          module_id?: string | null;
          order_index?: number | null;
          reading_time?: number | null;
          slug?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      compute_course_completion_time: {
        Args: {
          course_uuid: string;
        };
        Returns: number;
      };
      compute_module_completion_time: {
        Args: {
          module_uuid: string;
        };
        Returns: number;
      };
      compute_reading_time: {
        Args: {
          s: string;
        };
        Returns: number;
      };
      get_courses_progress: {
        Args: {
          p_course_ids: string[];
          p_user_id: string;
        };
        Returns: Json;
      };
      get_current_streak: {
        Args: {
          p_user_id: string;
        };
        Returns: number;
      };
      get_user_percentile: {
        Args: {
          p_user_id: string;
        };
        Returns: string;
      };
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      search_articles: {
        Args: {
          search_term: string;
        };
        Returns: {
          id: string;
          title: string;
          slug: string;
        }[];
      };
      slugify: {
        Args: {
          "": string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
