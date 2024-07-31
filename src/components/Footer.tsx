import React from "react";
import {
  GitHubLogoIcon,
  DiscIcon,
  LinkedInLogoIcon,
  DiscordLogoIcon,
} from "@radix-ui/react-icons";
export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between space-y-5 px-5 py-10 md:flex-row md:items-end md:p-0">
        <div className="space-y-10">
          <div className="w-full space-y-2 sm:w-96">
            <h1 className="text-3xl font-bold">Daily Media</h1>
            <p className="">
              Explore a world of coding insights and knowledge on our blog
              website, where every article is a step towards mastering the art
              of programming and staying ahead in the dynamic tech landscape
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GitHubLogoIcon className="h-5 w-5" />
            <LinkedInLogoIcon className="h-5 w-5" />
            <DiscordLogoIcon className="h-5 w-5" />
          </div>
        </div>

        <h1 className="text-sm">&copy; 2023 Chensokheng.All right reserved</h1>
      </div>
    </footer>
  );
}
