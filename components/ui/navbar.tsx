"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import React from "react";
import Image from "next/image";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { GlotsLogo } from "./glotsLogo";
//import {AcmeLogo} from "./AcmeLogo.jsx";

export default function GNavbar() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    // If not authenticated, redirect to the login page
    router.push("/profile");
    //return null; // You can render a loading indicator here
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["support", "Pricing", "About"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <GlotsLogo />
          <h1 className="text-2xl text-inherit ml-2">glots</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Support
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/api/auth/signin/google">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/api/auth/signin/google">
            <Button
              className="bg-[#CCD6A6] rounded-full"
              href="#"
              variant="flat"
            >
              Sign Up for free
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
