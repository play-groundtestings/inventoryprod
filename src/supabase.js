import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lsckvveawgzilvwkhzbd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzY2t2dmVhd2d6aWx2d2toemJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUxODg0NzAsImV4cCI6MTk4MDc2NDQ3MH0.u6M0bXs8YY_d2DPTO0oXYVwkys37MDfyH3m4qSKxvp4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)