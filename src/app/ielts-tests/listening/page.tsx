"use client";

import TestListPage from "@/app/components/TestListPage";
import { IeltsTest } from "@/app/models/IeltsTest";
import { useState } from "react";

export default function ListeningTestsPage() {
  const [tests] = useState<IeltsTest[]>([
    {
      id: "1",
      type: "Academic",
      title: "Academic Listening Test 1",
      testUrl: "/ielts-tests/listening/1",
      description:
        "Practice your listening skills with this academic test featuring various question types.",
    },
    {
      id: "2",
      type: "Academic",
      title: "Academic Listening Test 2",
      testUrl: "/ielts-tests/listening/2",
      description:
        "Another academic listening test to help you prepare for the IELTS exam.",
    },
    {
      id: "3",
      type: "General",
      title: "General Listening Test 1",
      testUrl: "/ielts-tests/listening/3",
      description:
        "Practice your listening skills with this general training test featuring everyday situations.",
    },
    {
      id: "4",
      type: "General",
      title: "General Listening Test 2",
      testUrl: "/ielts-tests/listening/4",
      description:
        "Another general training listening test to help you prepare for the IELTS exam.",
    },
  ]);

  return <TestListPage tests={tests} title="Listening Tests" />;
}
