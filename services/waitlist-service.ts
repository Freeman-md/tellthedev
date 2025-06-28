import { useSupabaseClient } from '#imports'

export async function addToWaitlist(email: string) {
  const supabase = useSupabaseClient()
  return supabase
    .from('waitlist')
    .insert([{ email }] as any)
} 