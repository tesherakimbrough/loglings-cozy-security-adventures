export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      game_sessions: {
        Row: {
          correct_answers: number
          created_at: string
          difficulty_level: string
          id: string
          scenarios_played: Json | null
          score: number
          time_elapsed: number
          total_rounds: number
          user_id: string
        }
        Insert: {
          correct_answers?: number
          created_at?: string
          difficulty_level?: string
          id?: string
          scenarios_played?: Json | null
          score?: number
          time_elapsed?: number
          total_rounds?: number
          user_id: string
        }
        Update: {
          correct_answers?: number
          created_at?: string
          difficulty_level?: string
          id?: string
          scenarios_played?: Json | null
          score?: number
          time_elapsed?: number
          total_rounds?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          audio_enabled: boolean | null
          color_blind_mode: string | null
          created_at: string
          font_size: string | null
          high_contrast: boolean | null
          id: string
          music_type: string | null
          music_volume: number | null
          notifications: boolean | null
          reduce_motion: boolean | null
          share_achievements: boolean | null
          sound_effects_enabled: boolean | null
          sound_effects_volume: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_enabled?: boolean | null
          color_blind_mode?: string | null
          created_at?: string
          font_size?: string | null
          high_contrast?: boolean | null
          id?: string
          music_type?: string | null
          music_volume?: number | null
          notifications?: boolean | null
          reduce_motion?: boolean | null
          share_achievements?: boolean | null
          sound_effects_enabled?: boolean | null
          sound_effects_volume?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_enabled?: boolean | null
          color_blind_mode?: string | null
          created_at?: string
          font_size?: string | null
          high_contrast?: boolean | null
          id?: string
          music_type?: string | null
          music_volume?: number | null
          notifications?: boolean | null
          reduce_motion?: boolean | null
          share_achievements?: boolean | null
          sound_effects_enabled?: boolean | null
          sound_effects_volume?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          achievements: string[] | null
          correct_answers: number
          created_at: string
          current_streak: number
          difficulty_level: string
          id: string
          longest_streak: number
          total_score: number
          total_sessions: number
          unlocked_loglings: string[] | null
          updated_at: string
          user_id: string
          user_mode: string
        }
        Insert: {
          achievements?: string[] | null
          correct_answers?: number
          created_at?: string
          current_streak?: number
          difficulty_level?: string
          id?: string
          longest_streak?: number
          total_score?: number
          total_sessions?: number
          unlocked_loglings?: string[] | null
          updated_at?: string
          user_id: string
          user_mode?: string
        }
        Update: {
          achievements?: string[] | null
          correct_answers?: number
          created_at?: string
          current_streak?: number
          difficulty_level?: string
          id?: string
          longest_streak?: number
          total_score?: number
          total_sessions?: number
          unlocked_loglings?: string[] | null
          updated_at?: string
          user_id?: string
          user_mode?: string
        }
        Relationships: []
      }
      waitlist_signups: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_premium: boolean | null
          source: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_premium?: boolean | null
          source?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_premium?: boolean | null
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
