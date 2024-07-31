import React from "react";
import { IBlog } from "@/lib/types";
import Image from "next/image";
import Content from "./Content";

export async function generateStaticParams() {
  const { data: blogs } = await fetch(
    process.env.SITE_URL + "/api/blog?id=*",
  ).then((res) => res.json());

  return blogs.map((blog: { id: number }) => ({
    params: { id: blog.id.toString() },
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: blog } = (await fetch(
    process.env.SITE_URL + "/api/blog?id=" + params.id,
  ).then((res) => res.json())) as { data: IBlog };

  return {
    title: blog?.title,
    authors: {
      name: "KR Shanto",
    },
    // TODO - Add more metadata
  };
}

export default async function page({ params }: { params: { id: string } }) {
  const { data: blog } = (await fetch(
    process.env.SITE_URL + "/api/blog?id=" + params.id,
  ).then((res) => res.json())) as { data: IBlog };

  if (!blog?.id) {
    return <h1 className="text-white">Not found</h1>;
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl space-y-10 pt-10">
      <div className="space-y-5 sm:px-10">
        <h1 className="text-3xl font-bold dark:text-gray-200">{blog?.title}</h1>
        <p className="text-sm dark:text-gray-400">
          {new Date(blog?.created_at!).toDateString()}
        </p>
      </div>

      <div className="relative h-96 w-full">
        <Image
          priority
          src={blog?.image_url!}
          alt="cover"
          fill
          className="rounded-md border-[0.5px] border-zinc-600 object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <Content blogId={params.id} />
    </div>
  );
}
