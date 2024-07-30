import Link from "next/link";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function Navbar() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        ShantoXCode
      </Link>

      {user ? <Profile /> : <LoginForm />}
    </nav>
  );
}
