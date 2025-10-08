import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Yoom",
    description: "Video calling app",
    icons: {
        icon: '/icons/logo.svg'
    }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
              layout: {
                  logoImageUrl: '/icons/yoom-logo.svg',
                  socialButtonsVariant: 'iconButton',
              },
              variables: {
                  // colorForeground: '#fff',
                  colorText: '#fff',
                  colorPrimary: '#1447E6',
                  colorBackground: '#0F172BFF',
              }
          }}
      >
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark `}
          >
          <main>
              {children}
          </main>
          <Toaster />
          </body>
        </html>
      </ClerkProvider>
  );
}
