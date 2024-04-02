import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaCalendarAlt, FaFolderOpen, FaPlus, FaVideo } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Home",
    path: "/",
    icon: <IoHomeSharp className="h-6 w-6" />,
  },
  {
    label: "Upcoming",
    path: "/upcoming",
    icon: <FaCalendarAlt className="h-6 w-6" />,
  },
  {
    label: "Previous",
    path: "/previous",
    icon: <FaFolderOpen className="h-6 w-6" />,
  },
  {
    label: "Recordings",
    path: "/recordings",
    icon: <FaVideo className="h-6 w-6" />,
  },
  {
    label: "Personal Room",
    path: "/personal-room",
    icon: <FaPlus className="h-6 w-6" />,
  },
];

type NavLinksProps = {
  isMobile: boolean;
};
const NavLinks = ({ isMobile }: NavLinksProps) => {
  const pathname = usePathname();
  return (
    <>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.label}
            href={link.path}
            className={cn("flex gap-4 items-center p-4 rounded-lg", {
              "bg-blue-1": isActive,
              "justify-start": !isMobile,
              "w-full max-w-60": isMobile,
            })}
          >
            {link.icon}
            <p
              className={cn("text-lg font-semibold", {
                "max-lg:hidden": !isMobile,
              })}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
