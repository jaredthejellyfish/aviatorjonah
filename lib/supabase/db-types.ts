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
			aircrafts: {
				Row: {
					aircraft_type: string;
					clerk_user_id: string;
					created_at: string | null;
					id: string;
					registration: string;
					updated_at: string | null;
				};
				Insert: {
					aircraft_type: string;
					clerk_user_id: string;
					created_at?: string | null;
					id?: string;
					registration: string;
					updated_at?: string | null;
				};
				Update: {
					aircraft_type?: string;
					clerk_user_id?: string;
					created_at?: string | null;
					id?: string;
					registration?: string;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			beta_applications: {
				Row: {
					aviation_experience: string;
					beta_policy_accepted: boolean;
					country: string;
					created_at: string;
					current_roles: string;
					discord: string | null;
					email: string;
					granted: boolean;
					id: string;
					name: string;
					terms_accepted: boolean;
					user_id: string | null;
				};
				Insert: {
					aviation_experience: string;
					beta_policy_accepted?: boolean;
					country: string;
					created_at?: string;
					current_roles: string;
					discord?: string | null;
					email: string;
					granted?: boolean;
					id?: string;
					name: string;
					terms_accepted?: boolean;
					user_id?: string | null;
				};
				Update: {
					aviation_experience?: string;
					beta_policy_accepted?: boolean;
					country?: string;
					created_at?: string;
					current_roles?: string;
					discord?: string | null;
					email?: string;
					granted?: boolean;
					id?: string;
					name?: string;
					terms_accepted?: boolean;
					user_id?: string | null;
				};
				Relationships: [];
			};
			conversations: {
				Row: {
					created_at: string | null;
					id: string;
					is_archived: boolean | null;
					metadata: Json | null;
					title: string | null;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					is_archived?: boolean | null;
					metadata?: Json | null;
					title?: string | null;
					updated_at?: string | null;
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					is_archived?: boolean | null;
					metadata?: Json | null;
					title?: string | null;
					updated_at?: string | null;
					user_id?: string;
				};
				Relationships: [];
			};
			copilot_settings: {
				Row: {
					created_at: string | null;
					frequency_penalty: number;
					id: string;
					max_tokens: number;
					presence_penalty: number;
					show_intermediate_steps: boolean;
					temperature: number;
					tone: Database["public"]["Enums"]["tone_level"];
					top_k: number;
					top_p: number;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					frequency_penalty?: number;
					id?: string;
					max_tokens?: number;
					presence_penalty?: number;
					show_intermediate_steps?: boolean;
					temperature?: number;
					tone?: Database["public"]["Enums"]["tone_level"];
					top_k?: number;
					top_p?: number;
					updated_at?: string | null;
					user_id?: string;
				};
				Update: {
					created_at?: string | null;
					frequency_penalty?: number;
					id?: string;
					max_tokens?: number;
					presence_penalty?: number;
					show_intermediate_steps?: boolean;
					temperature?: number;
					tone?: Database["public"]["Enums"]["tone_level"];
					top_k?: number;
					top_p?: number;
					updated_at?: string | null;
					user_id?: string;
				};
				Relationships: [];
			};
			document_metadata: {
				Row: {
					class: Database["public"]["Enums"]["class_type"] | null;
					created_at: string;
					document_number: string | null;
					document_type: Database["public"]["Enums"]["document_type"];
					expiry_date: string | null;
					file_name: string;
					file_path: string;
					id: string;
					issue_date: string | null;
					issuing_authority: string | null;
					ratings: string[] | null;
					remarks: string | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					class?: Database["public"]["Enums"]["class_type"] | null;
					created_at?: string;
					document_number?: string | null;
					document_type?: Database["public"]["Enums"]["document_type"];
					expiry_date?: string | null;
					file_name: string;
					file_path: string;
					id?: string;
					issue_date?: string | null;
					issuing_authority?: string | null;
					ratings?: string[] | null;
					remarks?: string | null;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					class?: Database["public"]["Enums"]["class_type"] | null;
					created_at?: string;
					document_number?: string | null;
					document_type?: Database["public"]["Enums"]["document_type"];
					expiry_date?: string | null;
					file_name?: string;
					file_path?: string;
					id?: string;
					issue_date?: string | null;
					issuing_authority?: string | null;
					ratings?: string[] | null;
					remarks?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [];
			};
			flight_entries: {
				Row: {
					aircraft_id: string | null;
					arrival_airport: string;
					arrival_time: string;
					clerk_user_id: string;
					conditions: Database["public"]["Enums"]["flight_condition"];
					created_at: string | null;
					date: string;
					departure_airport: string;
					departure_time: string;
					id: string;
					landings: number;
					night_time: unknown | null;
					remarks: string | null;
					search_vector: unknown | null;
					status: Database["public"]["Enums"]["flight_status"];
					total_time: unknown;
					updated_at: string | null;
				};
				Insert: {
					aircraft_id?: string | null;
					arrival_airport: string;
					arrival_time: string;
					clerk_user_id: string;
					conditions: Database["public"]["Enums"]["flight_condition"];
					created_at?: string | null;
					date: string;
					departure_airport: string;
					departure_time: string;
					id?: string;
					landings?: number;
					night_time?: unknown | null;
					remarks?: string | null;
					search_vector?: unknown | null;
					status?: Database["public"]["Enums"]["flight_status"];
					total_time: unknown;
					updated_at?: string | null;
				};
				Update: {
					aircraft_id?: string | null;
					arrival_airport?: string;
					arrival_time?: string;
					clerk_user_id?: string;
					conditions?: Database["public"]["Enums"]["flight_condition"];
					created_at?: string | null;
					date?: string;
					departure_airport?: string;
					departure_time?: string;
					id?: string;
					landings?: number;
					night_time?: unknown | null;
					remarks?: string | null;
					search_vector?: unknown | null;
					status?: Database["public"]["Enums"]["flight_status"];
					total_time?: unknown;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "flight_entries_aircraft_id_fkey";
						columns: ["aircraft_id"];
						isOneToOne: false;
						referencedRelation: "aircrafts";
						referencedColumns: ["id"];
					},
				];
			};
			messages: {
				Row: {
					content: string | null;
					conversation_id: string;
					created_at: string | null;
					id: string;
					metadata: Json | null;
					parent_message_id: string | null;
					revision_id: string | null;
					role: string;
					tool_invocations: Json[] | null;
					user_id: string;
				};
				Insert: {
					content?: string | null;
					conversation_id: string;
					created_at?: string | null;
					id?: string;
					metadata?: Json | null;
					parent_message_id?: string | null;
					revision_id?: string | null;
					role: string;
					tool_invocations?: Json[] | null;
					user_id: string;
				};
				Update: {
					content?: string | null;
					conversation_id?: string;
					created_at?: string | null;
					id?: string;
					metadata?: Json | null;
					parent_message_id?: string | null;
					revision_id?: string | null;
					role?: string;
					tool_invocations?: Json[] | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "messages_conversation_id_fkey";
						columns: ["conversation_id"];
						isOneToOne: false;
						referencedRelation: "conversations";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_parent_message_id_fkey";
						columns: ["parent_message_id"];
						isOneToOne: false;
						referencedRelation: "messages";
						referencedColumns: ["id"];
					},
				];
			};
			settings: {
				Row: {
					aircraft_type: string | null;
					clerk_user_id: string;
					cookie_preferences: Json | null;
					created_at: string;
					home_airport: string | null;
					id: string;
					medical_certificate: Json | null;
					onboarding_complete: boolean;
					photo_id: Json | null;
					pilot_certificate: Json | null;
					rating_goal: string | null;
					subscription: Json | null;
					units: string;
					updated_at: string;
				};
				Insert: {
					aircraft_type?: string | null;
					clerk_user_id: string;
					cookie_preferences?: Json | null;
					created_at?: string;
					home_airport?: string | null;
					id?: string;
					medical_certificate?: Json | null;
					onboarding_complete?: boolean;
					photo_id?: Json | null;
					pilot_certificate?: Json | null;
					rating_goal?: string | null;
					subscription?: Json | null;
					units?: string;
					updated_at?: string;
				};
				Update: {
					aircraft_type?: string | null;
					clerk_user_id?: string;
					cookie_preferences?: Json | null;
					created_at?: string;
					home_airport?: string | null;
					id?: string;
					medical_certificate?: Json | null;
					onboarding_complete?: boolean;
					photo_id?: Json | null;
					pilot_certificate?: Json | null;
					rating_goal?: string | null;
					subscription?: Json | null;
					units?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_flight_statistics: {
				Args: {
					user_id: string;
				};
				Returns: Json;
			};
			requesting_user_id: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
			search_flights_fts: {
				Args: {
					user_id: string;
					search_query: string;
				};
				Returns: {
					id: string;
					date: string;
					departure_airport: string;
					arrival_airport: string;
					departure_time: string;
					arrival_time: string;
					total_time: unknown;
					night_time: unknown;
					landings: number;
					conditions: Database["public"]["Enums"]["flight_condition"];
					remarks: string;
					aircraft_registration: string;
					aircraft_type: string;
					rank: number;
				}[];
			};
		};
		Enums: {
			class_type: "class_1" | "class_2" | "class_3" | "other";
			document_type:
				| "medical_certificate"
				| "pilot_license"
				| "type_rating"
				| "insurance"
				| "logbook"
				| "other";
			flight_condition: "VFR" | "IFR" | "SVFR";
			flight_status: "completed" | "pending" | "draft";
			tone_level: "professional" | "balanced" | "friendly";
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
