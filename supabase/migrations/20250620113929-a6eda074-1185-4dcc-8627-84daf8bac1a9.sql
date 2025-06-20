
-- Add missing DELETE policies for all tables to ensure users can only delete their own data

-- DELETE policy for profiles table
CREATE POLICY "Users can delete their own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- DELETE policy for user_progress table  
CREATE POLICY "Users can delete their own progress" ON public.user_progress
  FOR DELETE USING (auth.uid() = user_id);

-- DELETE policy for user_preferences table
CREATE POLICY "Users can delete their own preferences" ON public.user_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- DELETE policy for game_sessions table
CREATE POLICY "Users can delete their own sessions" ON public.game_sessions
  FOR DELETE USING (auth.uid() = user_id);
