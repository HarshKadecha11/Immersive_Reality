-- Create saved_properties table to track user saved properties
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create property_visits table to track scheduled visits
CREATE TABLE IF NOT EXISTS public.property_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL,
  visit_date DATE NOT NULL,
  visit_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agent_contacts table to track user-agent communications
CREATE TABLE IF NOT EXISTS public.agent_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  property_id TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row-level security
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_properties
DROP POLICY IF EXISTS "Users can view their own saved properties";
CREATE POLICY "Users can view their own saved properties"
  ON public.saved_properties
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own saved properties";
CREATE POLICY "Users can insert their own saved properties"
  ON public.saved_properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved properties";
CREATE POLICY "Users can delete their own saved properties"
  ON public.saved_properties
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for property_visits
DROP POLICY IF EXISTS "Users can view their own property visits";
CREATE POLICY "Users can view their own property visits"
  ON public.property_visits
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own property visits";
CREATE POLICY "Users can insert their own property visits"
  ON public.property_visits
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own property visits";
CREATE POLICY "Users can update their own property visits"
  ON public.property_visits
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for agent_contacts
DROP POLICY IF EXISTS "Users can view their own agent contacts";
CREATE POLICY "Users can view their own agent contacts"
  ON public.agent_contacts
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own agent contacts";
CREATE POLICY "Users can insert their own agent contacts"
  ON public.agent_contacts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table saved_properties;
alter publication supabase_realtime add table property_visits;
alter publication supabase_realtime add table agent_contacts;