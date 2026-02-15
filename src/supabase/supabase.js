import { createClient } from '@supabase/supabase-js'

// URL hamesha https se shuru hota hai
const supabaseUrl = 'https://stiqzfaicyzfhtufwoof.supabase.co'

// Key hamesha lambi wali string hoti hai (anon key)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0aXF6ZmFpY3l6Zmh0dWZ3b29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTQyMjMsImV4cCI6MjA4NjY3MDIyM30.GEKhCbE7U9Xh4DcUhn_d_gWH6YxeAoapTVCzppUDfFE'

export const supabase = createClient(supabaseUrl, supabaseKey)
