"use client";

import TestListPage from "@/app/components/TestListPage";
import { IeltsTest } from "@/app/models/IeltsTest";
import { useState } from "react";

export default function SpeakingTestsPage() {
  const [tests] = useState<IeltsTest[]>([
    {
      id: "1",
      type: "Academic",
      title: "Academic Speaking Test 1",
      testUrl: "/ielts-tests/speaking/1",
      description:
        "Practice your speaking skills with this academic test featuring various topics.",
    },
    {
      id: "2",
      type: "Academic",
      title: "Academic Speaking Test 2",
      testUrl: "/ielts-tests/speaking/2",
      description:
        "Another academic speaking test to help you prepare for the IELTS exam.",
    },
    {
      id: "3",
      type: "General",
      title: "General Speaking Test 1",
      testUrl: "/ielts-tests/speaking/3",
      description:
        "Practice your speaking skills with this general training test featuring everyday topics.",
    },
    {
      id: "4",
      type: "General",
      title: "General Speaking Test 2",
      testUrl: "/ielts-tests/speaking/4",
      description:
        "Another general training speaking test to help you prepare for the IELTS exam.",
    },
  ]);

  return <TestListPage tests={tests} title="Speaking Tests" />;
}
