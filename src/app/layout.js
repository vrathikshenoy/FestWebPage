// src/app/layout.jsx
import React from 'react'

import { Inter } from "next/font/google";
import "../styles/globals.css"; // Ensure global styles are applied

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    ClerkLoading,
    ClerkLoaded,
} from '@clerk/nextjs'// Import the Footer component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AstroFest",
  description: "",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>
    <html lang="en">

      <body className={inter.className}>
 <ClerkLoading>
     <div className="flex items-center justify-center  h-screen text-2xl">
         Loading...
     </div>
 </ClerkLoading>
<ClerkLoaded>
        {children}

</ClerkLoaded>
      </body>
    </html>
      </ClerkProvider>
  );
}
