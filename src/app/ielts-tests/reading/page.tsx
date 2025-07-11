"use client";

import TestListPage from "@/app/components/TestListPage";
import { IeltsTest } from "@/app/models/IeltsTest";
import { useState } from "react";

export default function ReadingTestsPage() {
  const [tests] = useState<IeltsTest[]>([
    {
      id: "1",
      type: "Academic",
      title: "Academic Reading Test 1",
      testUrl: "/ielts-tests/reading/1",
      description:
        "Practice your reading skills with this academic test featuring various question types.",
    },
    {
      id: "2",
      type: "Academic",
      title: "Academic Reading Test 2",
      testUrl: "/ielts-tests/reading/2",
      description:
        "Another academic reading test to help you prepare for the IELTS exam.",
    },
    {
      id: "3",
      type: "General",
      title: "General Reading Test 1",
      testUrl: "/ielts-tests/reading/3",
      description:
        "Practice your reading skills with this general training test featuring everyday texts.",
    },
    {
      id: "4",
      type: "General",
      title: "General Reading Test 2",
      testUrl: "/ielts-tests/reading/4",
      description:
        "Another general training reading test to help you prepare for the IELTS exam.",
    },
  ]);

  return <TestListPage tests={tests} title="Reading Tests" />;
}
