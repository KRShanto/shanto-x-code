import React from "react";
import EditForm from "./EditForm";
import { IBlogDetials } from "@/lib/types";
import { readBlogDeatailById } from "@/actions/blog";

export default async function Edit({ params }: { params: { id: string } }) {
  const { data: blog } = await readBlogDeatailById(params.id);
  return <EditForm blog={blog as IBlogDetials} />;
}
