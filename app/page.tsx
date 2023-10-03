import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import GNavbar from "@/components/ui/navbar";
import Herosection from "./herosection";
import Features from "./features";
import Testimonials from "./testimonials";
import Footer from "./footer";
require('dotenv').config();

export default function Home() {
  return (
    <main>
      <GNavbar />
      <Herosection />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
