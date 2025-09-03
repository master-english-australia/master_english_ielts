"use client";

import { useEffect } from "react";
import { Box } from "@mui/material";
import { Colors } from "@/app/consts/colors";
import { Shadows } from "./consts/shadows";
import ActionTestCard from "./components/ActionTestCard";

export interface TestCardProps {
  title: string;
  testUrl: string;
  bgColor?: string;
  ctaColor?: string;
  buttonText?: string;
}

export default function Home() {
  useEffect(() => {}, []);

  const features: TestCardProps[] = [
    {
      title: "Speaking Tests",
      testUrl: "/ielts-tests/speaking",
      bgColor: Colors.CARD_BG_LIGHT_RED,
      ctaColor: Colors.PRIMARY,
    },
    {
      title: "Writing Tests",
      testUrl: "/ielts-tests/writing",
      bgColor: Colors.CARD_BG_LIGHT_RED,
      ctaColor: Colors.PRIMARY,
    },
    {
      title: "Reading Tests",
      testUrl: "/ielts-tests/reading",
      bgColor: Colors.CARD_BG_LIGHT_RED,
      ctaColor: Colors.PRIMARY,
    },
    {
      title: "Listening Tests",
      testUrl: "/ielts-tests/listening",
      bgColor: Colors.CARD_BG_LIGHT_RED,
      ctaColor: Colors.PRIMARY,
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: Colors.WHITE,
        borderRadius: "8px",
        boxShadow: Shadows.MAIN,
        padding: "30px",
        marginTop: "20px",
      }}
    >
      <Box
        component="h1"
        sx={{
          color: Colors.MAIN_TEXT,
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Master IELTS
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {features.map((feature, index) => (
          <ActionTestCard
            key={index}
            sx={{
              background: feature.bgColor,
              textAlign: "center",
            }}
          >
            <Box component="h2" sx={{ fontWeight: "bold", mb: 2, mt: 1 }}>
              {feature.title}
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <a
                href={feature.testUrl}
                style={{
                  display: "inline-block",
                  background: Colors.PRIMARY,
                  color: Colors.WHITE,
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  width: "80%",
                }}
              >
                Explore Tests
              </a>
            </Box>
          </ActionTestCard>
        ))}
      </Box>
    </Box>
  );
}
