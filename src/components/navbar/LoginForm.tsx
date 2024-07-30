"use client";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { createBrowserClient } from "@supabase/ssr";
import { usePathname } from "next/navigation";
import React from "react";

export default function LoginForm() {
  const pathname = usePathname();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin() {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });
  }

  return (
    <Button
      className="flex items-center gap-2"
      variant="outline"
      onClick={handleLogin}
    >
      <SiGithub /> Login
    </Button>
  );
}
