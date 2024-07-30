"use client";
import Link from "next/link";
import { useUser } from "@/lib/store/user";
import LoginForm from "./LoginForm";
import Profile from "./Profile";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        ShantoXCode
      </Link>

      {user ? <Profile /> : <LoginForm />}
    </nav>
  );
}
