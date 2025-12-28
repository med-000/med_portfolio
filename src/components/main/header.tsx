"use client";

import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

export const Header = () => {
  const pathName = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/timeline", label: "Timeline" },
    { href: "/project", label: "Projects" },
    { href: "/blog", label: "Blogs" },
  ];
  return (
    <header className='sticky flex justify-between items-center top-0 px-[3vw] py-[2vw] bg-background z-100'>
      <div className='font-bold text-4xl'>med-000</div>
      <NavigationMenu className='justify-self-center'>
        <NavigationMenuList className='flex gap-3'>
          {navLinks.map((nabLink) => (
            <NavigationMenuItem key={nabLink.label}>
              <NavigationMenuLink
                active={pathName === nabLink.href}
                className={cn(
                  "px-5 py-2 rounded-full",
                  "data-active:bg-accent",
                  "data-active:text-black"
                )}
                href={nabLink.href}
              >
                {nabLink.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
