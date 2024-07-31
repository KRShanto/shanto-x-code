"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import ManageBill from "@/components/stripe/Manage";

export default function Profile() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { user } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  const isAdmin = user?.role === "admin";
  const isSub = user?.stripe_customer_id;

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user?.image_url!}
          alt={user?.name!}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 p-2" side="bottom">
        <div className="px-4">
          <p className="text-sm">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {!isAdmin && isSub && (
          <ManageBill customerId={user?.stripe_customer_id!} />
        )}

        {isAdmin && (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between"
            >
              Dashboard <DashboardIcon />
            </Button>
          </Link>
        )}

        <div>
          <hr className="mx-auto w-[90%]" />
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between"
            onClick={handleLogout}
          >
            Log out <LockOpen1Icon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
