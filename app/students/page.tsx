import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Students() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: students } = await supabase.from("students").select();

  return <pre>{JSON.stringify(students, null, 2)}</pre>

}