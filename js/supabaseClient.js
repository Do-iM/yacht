import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://plhqdlseoaszzjfhkzni.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaHFkbHNlb2FzenpqZmhrem5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjczMzcsImV4cCI6MjA1OTQ0MzMzN30.1atBaUEKzWRgQIST38aa1KRPRH_glE460uWUdWFsLZ4'
)
