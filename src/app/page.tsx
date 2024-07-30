"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";

export default function HomePage() {
  const { setTheme } = useTheme();

  return (
    <div>
      <h1>Home Page</h1>

      <Button onClick={() => setTheme("light")}>Theme Light</Button>
      <Button onClick={() => setTheme("dark")}>Theme Dark</Button>
    </div>
  );
}
