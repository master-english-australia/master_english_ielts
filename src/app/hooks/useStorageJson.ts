import { getBrowserSupabaseClient } from "@/lib/supabase/browserClient";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface UseStorageJsonState<TData> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  path: string;
}

export function useStorageJson<TData = unknown>(
  bucket: string,
  pathFactory: () => string,
): UseStorageJsonState<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const path = useMemo(() => pathFactory(), [pathFactory]);
  const versionRef = useRef<string>(String(Date.now()));

  const fetchCore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getBrowserSupabaseClient();
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(path);

      const url = `${publicUrl}?v=${encodeURIComponent(versionRef.current)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
      const json = (await res.json()) as TData;
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [bucket, path]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await fetchCore();
      } finally {
        if (cancelled) return;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchCore]);

  const reload = useCallback(async () => {
    await fetchCore();
  }, [fetchCore]);

  return { data, loading, error, reload, path };
}
