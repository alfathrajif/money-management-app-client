import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Authenticated from "./(auth)/authenticated";
import Providers from "./providers";
import Navbar from "@/components/partials/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "A simple expense tracker to help you keep track of your spending",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = Authenticated();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers authenticated={isAuthenticated}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {isAuthenticated && <Navbar />}
            <main className={isAuthenticated ? "logged-in" : ""}>
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
