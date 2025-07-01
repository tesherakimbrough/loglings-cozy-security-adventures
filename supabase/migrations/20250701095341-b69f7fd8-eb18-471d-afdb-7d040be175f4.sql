
-- Create a waitlist table to track signups properly
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  source TEXT DEFAULT 'waitlist',
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for count display)
CREATE POLICY "Anyone can view waitlist count" 
  ON public.waitlist_signups 
  FOR SELECT 
  USING (true);

-- Create policy for public insert (for signups)
CREATE POLICY "Anyone can signup for waitlist" 
  ON public.waitlist_signups 
  FOR INSERT 
  WITH CHECK (true);

-- Create an index for performance
CREATE INDEX idx_waitlist_signups_created_at ON public.waitlist_signups(created_at);
CREATE INDEX idx_waitlist_signups_is_premium ON public.waitlist_signups(is_premium);
