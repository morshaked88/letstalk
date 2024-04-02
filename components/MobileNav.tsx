"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";

const MobileNav = () => {
  return (
    <section className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <IoMenu className="text-white text-4xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/logo-letstalk.svg"
              width={32}
              height={32}
              alt="LetsTalk logo"
              className="max-sm:size-10"
            />
            <p className="text-white text-[26px] font-extrabold">
              {"Let'sTalk"}
            </p>
          </Link>
          <div className="flex flex-col h-[calc(100vh-72px)] justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                <NavLinks isMobile />
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
