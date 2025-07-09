"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IELTSTestsPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/ielts-tests") {
      router.replace("/ielts-tests/reading");
    }
  }, [router, pathname]);

  return (
    <div className="loading">
      <p>Loading IELTS tests...</p>
    </div>
  );
}
