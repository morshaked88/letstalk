import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="justify-between w-full flex fixed z-50 bg-dark-1 px-6 py-4 lg:px-10 items-center">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo-letstalk.svg"
          width={32}
          height={32}
          alt="LetsTalk logo"
          className="max-sm:size-10"
        />
        <p className="text-white text-[26px] font-extrabold max-sm:hidden">
          {"Let'sTalk"}
        </p>
      </Link>
      <div className="flex justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        
      </div>
      <MobileNav />
    </nav>
  );
};

export default Navbar;
