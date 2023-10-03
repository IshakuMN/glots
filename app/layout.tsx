import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Karla } from "next/font/google";
import { Providers } from "./providers";
require('dotenv').config();

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

const karla = Karla({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "glots",
  description: "vocabulary learning app",

  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
       <head>
        <link rel='icon' href='/icon.svg' sizes='any'/>
        </head>
      <body className={karla.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
