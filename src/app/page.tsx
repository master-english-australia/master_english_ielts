"use client";

import Link from "next/link";
import { useEffect } from "react";

interface FeatureProps {
  title: string;
  description: string;
  link: string;
}

function FeatureCard({ title, description, link }: FeatureProps) {
  return (
    <Link href={link} className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="feature-cta">Explore Tests</div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => {
    console.log("IELTS Master application loaded");
  }, []);

  const features = [
    {
      title: "Speaking Practice",
      description:
        "Practice your IELTS speaking skills with AI-powered conversations.",
      link: "/ielts-tests/speaking",
    },
    {
      title: "Writing Assessment",
      description: "Get your IELTS essays evaluated with detailed feedback.",
      link: "/ielts-tests/writing",
    },
    {
      title: "Reading Exercises",
      description:
        "Improve your reading comprehension with IELTS-style passages.",
      link: "/ielts-tests/reading",
    },
    {
      title: "Listening Tests",
      description:
        "Enhance your listening skills with authentic IELTS audio tests.",
      link: "/ielts-tests/listening",
    },
  ];

  return (
    <main className="design-mockup">
      <h1>IELTS Master</h1>
      <p>
        Prepare for your IELTS exam with our comprehensive practice platform
      </p>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            link={feature.link}
          />
        ))}
      </div>
    </main>
  );
}
