"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathName = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    // { href: "/timeline", label: "Timeline" },
    { href: "/project", label: "Projects" },
    // { href: "/blog", label: "Blogs" },
  ];
  const socialLinks = [
    { href: "https://github.com/med-000", label: "GitHub" },
    { href: "mailto:med.rk000@gmail.com", label: "Gmail" },
    { href: "https://x.com/med_rk000", label: "Twitter" },
  ];
  return (
    <header className='sticky flex items-center top-0 px-[5vw] py-[3vw] bg-background z-50'>
      <div className='font-bold text-4xl'>med-000</div>
      <NavigationMenu className='ml-auto hidden md:flex'>
        <NavigationMenuList className='flex gap-2'>
          {navLinks.map((nabLink) => (
            <NavigationMenuItem key={nabLink.label}>
              <NavigationMenuLink
                active={pathName === nabLink.href}
                className={cn(
                  "px-5 py-2 rounded-full font-bold",
                  "data-active:bg-accent",
                  "data-active:text-black",
                )}
                href={nabLink.href}
              >
                {nabLink.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger className='ml-auto px-5 py-2 md:ml-4'>
          <Menu className='size-6 text-white/80' />
        </SheetTrigger>

        <SheetContent
          side='right'
          className='w-85 border-l bg-(--panel-bg) backdrop-blur-xl'
        >
          <div className='flex h-full flex-col px-6 py-6'>
            <div className='mb-8 flex items-center justify-between'>
              <SheetClose className='text-white/40 hover:text-white/80 transition' />
            </div>
            <div className='flex flex-col gap-5'>
              {navLinks.map((link) => (
                <div
                  className='flex items-center gap-4 md:hidden'
                  key={link.href}
                >
                  <span className='text-2xl font-semibold'>
                    <Link href={link.href}>{link.label}</Link>
                  </span>
                  <div className='flex-1 border-b' />
                </div>
              ))}
              <div className='flex items-center gap-4'>
                <span className='text-2xl font-semibold'>Links</span>
                <div className='flex-1 border-b' />
              </div>
              {socialLinks.map((socialLink) => (
                <Link
                  key={socialLink.label}
                  className='flex items-center gap-2 font-bold text-sm px-5'
                  href={socialLink.href}
                  target='_blank'
                >
                  <ChevronRight className='size-4' />
                  {socialLink.label}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
