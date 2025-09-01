import ActionTestCard from "@/app/components/ActionTestCard";
import { Box } from "@mui/material";
import { TestCardType } from "./TestCardType";
import ActionButton from "./ActionButton";
import { TestCardTitle } from "./TestCardTitle";
import Link from "next/link";

export interface TestCardProps {
  type: string;
  title: string;
  testUrl: string;
}

export interface TestCardPropsWithLoading extends TestCardProps {
  isLoading: boolean;
}

export default function TestCard(props: TestCardPropsWithLoading) {
  return (
    <ActionTestCard>
      <Box
        sx={{
          marginBottom: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <TestCardType type={props.type} isLoading={props.isLoading} />
      </Box>

      <TestCardTitle title={props.title} isLoading={props.isLoading} />

      <ActionButton
        component={Link}
        href={props.testUrl}
        isLoading={props.isLoading}
      >
        Take Test
      </ActionButton>
    </ActionTestCard>
  );
}
