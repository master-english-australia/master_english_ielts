"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IELTSTestsPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're exactly at /ielts-tests
    if (pathname === "/ielts-tests") {
      // Redirect to reading tests page by default
      // Using replace instead of push allows the back button to skip this page
      router.replace("/ielts-tests/reading");
    }
  }, [router, pathname]);

  return (
    <div className="loading">
      <p>Loading IELTS tests...</p>
    </div>
  );
}
