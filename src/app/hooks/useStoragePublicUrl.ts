import { getBrowserSupabaseClient } from "@/lib/supabase/browserClient";
import { useMemo } from "react";

export function useStoragePublicUrl(bucket: string, path?: string) {
  return useMemo(() => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const supabase = getBrowserSupabaseClient();
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl;
  }, [bucket, path]);
}
