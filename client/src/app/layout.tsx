import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}
