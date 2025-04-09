import { createClient } from 'https://esm.sh/@supabase/supabase-js'

export const supabase = createClient(
  'https://plhqdlseoaszzjfhkzni.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaHFkbHNlb2FzenpqZmhrem5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjczMzcsImV4cCI6MjA1OTQ0MzMzN30.1atBaUEKzWRgQIST38aa1KRPRH_glE460uWUdWFsLZ4'
)

export async function user() {
  const { data, error } = await supabase.auth.getUser();
  console.log(data)
  console.log(error)
  return data.user;
}

export async function signin(id, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${id}@email.com`,
    password: password,
  })
  console.log(data)
  console.log(error)
  if (data.user) {
    window.location.href = `/admin/?id=${data.user.id}`
  }
}

export async function insert(table, values) {
  const { error } = await supabase.from(table).insert(values)
  console.log(error)
}

export async function insertSelect(table, values) {
  const { data, error } = await supabase.from(table).insert(values).select()
  console.log(data)
  console.log(error)
  return data
}

export async function select(table) {
  const { data, error } = await supabase.from(table).select()
  console.log(data)
  console.log(error)
  return data
}

export async function selectIn(table, column, values) {
  const { data, error } = await supabase.from(table).select().in(column, values)
  console.log(data)
  console.log(error)
  return data
}
