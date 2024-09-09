'use client';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useEffect } from 'react'
import {
  ClerkProvider,
  ClerkLoading,
  ClerkLoaded,
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  useUser,
  UserButton
} from '@clerk/nextjs'
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'

export default function NavigationBar({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
      <nav
          className="fixed top-0 left-0 w-full z-50 text-white shadow-md navbar-container bg-opacity-80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                  src="images/NIPE.png"
                  alt="Logo"
                  className="h-20 w-23"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-6 flex-1 justify-center">
              <Link href={'/'}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <button
                  onClick={() => scrollToSection("events")}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                Events
              </button>
              <Link href="/schedule">
                <button
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  Schedule
                </button>
              </Link>
              <Link href="/about">
                <button
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  About
                </button>
              </Link>
              <Link href="/contactUs">
                <button
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-white focus:outline-none"
              >
                {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
              </button>
            </div>

            {/* Profile or Login Button */}
            <div className="hidden sm:flex items-center space-x-4">
              {isSignedIn ? (
                  <UserButton afterSignOutUrl="/"/>
              ) : (
                  <Link href="/sign-in">
                    <button
                        className="px-4 py-2 bg-gray-800 text-sm text-white rounded-md hover:bg-gray-700 transition">
                      Login
                    </button>
                  </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div className="block w-full text-left px-4 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition">
              <div className="py-2 px-1 space-y-4">
                {isSignedIn ? (
                    <UserButton afterSignOutUrl="/"/>
                ) : (
                    <Link href="/sign-in">
                      <button
                          className="block w-full text-left px-4 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition">
                        Login
                      </button>
                    </Link>
                )}
              </div>
              {['home', 'events', 'schedule', 'about', 'contactUs'].map((section) => (
                  <button
                      key={section}
                      onClick={() => {
                        scrollToSection(section);
                        toggleMenu();
                      }}
                      className="block w-full text-left px-4 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
              ))}

            </div>
        )}
      </nav>
  );
}
