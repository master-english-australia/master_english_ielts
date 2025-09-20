"use client";

import type { IeltsSection, IeltsTest } from "@/app/models/IeltsTest";
import { getBrowserSupabaseClient } from "@/lib/supabase/browserClient";
import { useEffect, useMemo, useState } from "react";

type IeltsType = "Academic" | "General";

interface UseTestsListOptions {
  part: IeltsSection;
  type?: IeltsType;
}

export function useTestsList(options: UseTestsListOptions) {
  const { part, type } = options;

  const [data, setData] = useState<IeltsTest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = getBrowserSupabaseClient();

    async function load() {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("tests")
          .select("*")
          .eq("part", part)
          .order("book_number", { ascending: false })
          .order("test_number", { ascending: false });

        if (type) query = query.eq("type", type);

        const { data: rows, error: qError } = await query;
        if (qError) throw qError;

        const mapped: IeltsTest[] = (rows || []).map((r) => {
          const typeSegment =
            part === "writing" ? `/${(r.type || "General").toLowerCase()}` : "";
          return {
            id: r.id,
            type: r.type,
            title: r.title,
            description: r.description || "",
            testUrl: `/ielts-tests/${part}${typeSegment}/${r.book_number}-${r.test_number}`,
          };
        });

        if (!cancelled) setData(mapped);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load tests");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [part, type]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}
