"use client";

import { NavLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "./Logo";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Logo />

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col gap-2 md:flex">
              {NavLinks.slice(0, 6).map((link) => {
                const isActive = pathname === link.route;

                return (
                  <li
                    className={`group flex w-full items-center justify-center whitespace-nowrap rounded-full bg-cover font-semibold transition-all hover:to-brand-100 hover:shadow-inner ${isActive ? "bg-gradient text-white" : "text-gray-700"}`}
                    key={link.route}
                  >
                    <Link
                      href={link.route}
                      className="flex size-full items-center gap-4 p-4"
                    >
                      <Image
                        src={link.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={`${isActive ? "brightness-200" : ""}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="hidden w-full flex-col gap-2 md:flex">
              {NavLinks.slice(6).map((link) => {
                const isActive = pathname === link.route;

                return (
                  <li
                    className={`group flex w-full items-center justify-center whitespace-nowrap rounded-full bg-cover font-semibold transition-all hover:to-brand-100 hover:shadow-inner ${isActive ? "bg-gradient text-white" : "text-gray-700"}`}
                    key={link.route}
                  >
                    <Link
                      href={link.route}
                      className="flex size-full items-center gap-4 p-4"
                    >
                      <Image
                        src={link.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={`${isActive ? "brightness-200" : ""}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button
              asChild
              className="flex items-center justify-center rounded-full bg-gradient bg-cover px-6 py-4 font-semibold focus-visible:ring-transparent focus-visible:ring-offset-0"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
