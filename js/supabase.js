import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://trafuumjrgbnuynludfz.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYWZ1dW1qcmdibnV5bmx1ZGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NjQ0NjYsImV4cCI6MjA5ODM0MDQ2Nn0.OEJREkd5tGWH8DbOjLMpNgPHGFmv7CvAWZFev9dAZNA";

export const supabase = createClient(supabaseUrl, supabaseKey);
