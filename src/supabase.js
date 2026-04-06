import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ojelfrseqehiippzxmsl.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZWxmcnNlcWVoaWlwcHp4bXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDU3MTksImV4cCI6MjA5MTAyMTcxOX0.wMic1_7Pz7Bc5OvH8sG2vJNNKb7GkDLxmJ7jqqmK_H8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
