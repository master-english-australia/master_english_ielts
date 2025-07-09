"use client";

import TestListPage from "@/app/components/TestListPage";
import { IeltsTest } from "@/app/models/IeltsTest";
import { useState } from "react";

export default function WritingTestsPage() {
  const [tests] = useState<IeltsTest[]>([
    {
      id: "academic-writing-test",
      type: "Academic",
      title: "Academic Writing Test",
      testUrl: "/ielts-tests/writing/academic-writing-test",
      description:
        "Practice both Academic Writing Task 1 (Chart/Graph) and Task 2 (Essay) in a single test.",
    },
  ]);

  return <TestListPage tests={tests} />;
}
