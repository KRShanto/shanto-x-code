import React, { ReactNode } from "react";
import NavLinks from "./NavLinks";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavLinks />
      {children}
    </>
  );
}
