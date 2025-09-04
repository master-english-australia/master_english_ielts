import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
      },
      { status: 500 },
    );
  }

  const healthUrl = `${supabaseUrl.replace(/\/$/, "")}/auth/v1/health`;

  try {
    const res = await fetch(healthUrl, { cache: "no-store" });
    const data = await res
      .json()
      .catch(() => ({ message: "No JSON body returned from /auth/v1/health" }));
    return NextResponse.json({ ok: res.ok, status: res.status, data });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Failed to reach Supabase /auth/v1/health",
      },
      { status: 500 },
    );
  }
}
