export interface IeltsTest {
  id: string;
  type: string;
  title: string;
  testUrl: string;
  description: string;
}

export type IeltsSection = "reading" | "writing" | "speaking" | "listening";