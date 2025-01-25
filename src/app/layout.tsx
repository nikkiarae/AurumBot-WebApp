import type { Metadata } from "next";
import { Header, Footer, Main, Wrapper } from "@/components/Layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Aurum Bot",
  description: "Your guide to discovering crypto treasures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Wrapper>
      </body>
    </html>
  );
}
