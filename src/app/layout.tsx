import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import NavLinks from "../components/Navlinks";
import NewsMarquee from "../components/NewsMarquee";


export const metadata: Metadata = {
  title: "DeshBarta",
  description: "বাংলার প্রতিদিনের সংবাদ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Header></Header>
        <NavLinks></NavLinks>
        <NewsMarquee></NewsMarquee>
        {children}
      </body>
    </html>
  );
}