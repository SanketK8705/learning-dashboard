import { createClient } from "@supabase/supabase-js";
import type { Course } from "./types";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Check your .env.local file."
    );
  }
  return createClient(url, key);
}

export async function getCourses(): Promise<Course[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Failed to fetch courses: ${error.message}`);
  return data ?? [];
}
