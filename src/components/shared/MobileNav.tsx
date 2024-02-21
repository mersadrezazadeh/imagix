"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNav() {
  const pathname = usePathname();

  return (
    <header className="fixed flex h-16 w-full items-center justify-between border-b-4 border-brand-100 bg-white p-5 shadow-sm lg:hidden">
      <Logo />

      <nav className="flex items-center gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger asChild>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                height={32}
                width={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll sm:w-72">
              <>
                <Image
                  src="/assets/images/logoipsum.svg"
                  alt="logo"
                  height={23}
                  width={152}
                />

                <ul className="mt-8 flex w-full flex-col justify-between gap-5">
                  {NavLinks.map((link) => {
                    const isActive = pathname === link.route;

                    return (
                      <li
                        className={`p-18 flex whitespace-nowrap font-semibold ${isActive ? "bg-gradient bg-cover bg-clip-text text-transparent" : "text-gray-700"}`}
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
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
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
    </header>
  );
}

export default MobileNav;
