import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const supabase = await createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { searchParams } = new URL(request.url);

  const slug = searchParams.get("slug");

  if (slug === "*") {
    const result = await supabase.from("blog").select("slug");
    return Response.json({ ...result });
  } else if (slug) {
    const result = await supabase
      .from("blog")
      .select("*")
      .eq("slug", slug)
      .single();
    return Response.json({ ...result });
  }
  return Response.json({});
}
