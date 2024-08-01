"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { IBlogDetials, IBlogForm } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import { BlogFormSchema, BlogFormSchemaType } from "../schema";

export default function BlogForm({
  defaultBlog,
  onHandleSubmit,
}: {
  defaultBlog?: IBlogDetials;
  onHandleSubmit: (data: BlogFormSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreivew] = useState(false);
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: defaultBlog?.title,
      slug: defaultBlog?.slug,
      content: defaultBlog?.blog_content.content,
      image_url: defaultBlog?.image_url,
      is_premium: defaultBlog?.is_premium,
      is_published: defaultBlog?.is_published,
    },
  });

  const onSubmit = (data: z.infer<typeof BlogFormSchema>) => {
    startTransition(() => {
      onHandleSubmit(data);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md border pb-5"
      >
        <div className="flex flex-wrap items-center gap-2 border-b p-5 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <span
              onClick={() => {
                setPreivew(
                  !isPreview && !form.getFieldState("image_url").invalid,
                );
              }}
              role="button"
              tabIndex={0}
              className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all hover:border-slate-700"
            >
              {!isPreview ? (
                <>
                  <EyeOpenIcon />
                  Preivew
                </>
              ) : (
                <>
                  <Pencil1Icon />
                  Edit
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 rounded-md border p-2">
                    <FormLabel className="flex items-center gap-1 text-sm">
                      <StarIcon />
                      <span>Premium</span>
                    </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3 rounded-md border p-2">
                      <FormLabel className="flex items-center gap-1 text-sm">
                        <RocketIcon />
                        <span className="text-sm">Publish</span>
                      </FormLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            role="button"
            className={cn(
              "group flex items-center gap-2 rounded-md border border-green-500 bg-zinc-800 px-3 py-2 text-sm transition-all disabled:border-gray-800 disabled:bg-gray-900",
              { "animate-spin": isPending },
            )}
            disabled={!form.formState.isValid}
          >
            <BsSave className="animate-bounce group-disabled:animate-none" />
            Save
          </button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "flex w-full gap-2 break-words p-2",
                      isPreview ? "divide-x-0" : "divide-x",
                    )}
                  >
                    <Input
                      placeholder="Blog title"
                      {...field}
                      autoFocus
                      className={cn(
                        "border-none text-lg font-medium",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                      )}
                    />
                    <div
                      className={cn(
                        "lg:px-10",
                        isPreview
                          ? "mx-auto w-full lg:w-4/5"
                          : "hidden w-1/2 lg:block",
                      )}
                    >
                      <h1 className="text-3xl font-bold dark:text-gray-200">
                        {form.getValues().title || "Untittle blog"}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState("title").invalid &&
                form.getValues().title && (
                  <div className="px-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "flex w-full gap-2 break-words p-2",
                      isPreview ? "divide-x-0" : "divide-x",
                    )}
                  >
                    <Input
                      placeholder="Blog slug"
                      {...field}
                      autoFocus
                      className={cn(
                        "border-none text-lg",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                      )}
                    />
                    <div
                      className={cn(
                        "lg:px-10",
                        isPreview
                          ? "mx-auto w-full lg:w-4/5"
                          : "hidden w-1/2 lg:block",
                      )}
                    >
                      <h1 className="text-lg dark:text-gray-400">
                        {form.getValues().slug
                          ? `https://${host}/blog/${form.getValues().slug}`
                          : "Undefined slug"}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState("slug").invalid && form.getValues().slug && (
                <div className="px-2">
                  <FormMessage />
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      "flex w-full items-center gap-2 divide-x p-2",
                      isPreview ? "divide-x-0" : "divide-x",
                    )}
                  >
                    <Input
                      placeholder="🔗 Image url"
                      {...field}
                      className={cn(
                        "border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                      )}
                      type="url"
                    />
                    <div
                      className={cn(
                        "relative",
                        isPreview
                          ? "mx-auto w-full px-0 lg:w-4/5"
                          : "hidden w-1/2 px-10 lg:block",
                      )}
                    >
                      {isPreview ? (
                        <div className="relative mt-10 h-80 w-full rounded-md border">
                          <Image
                            src={form.getValues().image_url}
                            alt="preview"
                            fill
                            className="rounded-md object-cover object-center"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400">
                          👆 click on preview to see image
                        </p>
                      )}
                    </div>
                  </div>
                </FormControl>

                <div className="px-3">
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "flex w-full gap-2 p-2",
                    !isPreview ? "h-70vh divide-x" : "divide-x-0",
                  )}
                >
                  <Textarea
                    placeholder="Blog content"
                    {...field}
                    className={cn(
                      "h-70vh resize-none border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                    )}
                  />
                  <div
                    className={cn(
                      "h-full overflow-scroll",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "hidden w-1/2 lg:block",
                    )}
                  >
                    <MarkdownPreview
                      content={form.getValues().content}
                      className="lg:px-10"
                    />
                  </div>
                </div>
              </FormControl>

              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

const ImgaeEror = ({ src }: { src: string }) => {
  try {
    return <Image src={src} alt="" width={100} height={100} />;
  } catch {
    return <h1>Invalid</h1>;
  }
};
