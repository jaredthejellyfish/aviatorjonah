"use client";

import { Protect, SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { Plane } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Squash as Hamburger } from "hamburger-react";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Add effect to handle body scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center shrink-0" href="/">
            <Plane className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-lg sm:text-xl text-indigo-600 dark:text-indigo-400">
              AviatorJonah
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <SignedIn>
              <Protect permission="org:owner:access">
                <Link
                  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:inline-block"
                  href="/admin"
                >
                  Admin
                </Link>
              </Protect>
              <Protect permission="org:content_creator:access">
                <Link
                  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:inline-block"
                  href="/content-studio"
                >
                  Content Studio
                </Link>
              </Protect>
              <Link
                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:inline-block"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:inline-block"
                href="/courses"
              >
                Courses
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <ModeToggle className="sm:flex hidden" />
            <SignedIn>
              <div className="sm:hidden p-0">
                <Hamburger
                  size={20}
                  toggled={isOpen}
                  toggle={() => setIsOpen(!isOpen)}
                />
              </div>
            </SignedIn>
          </nav>
        </div>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm top-16 left-0 right-0 z-40"
          >
            <div className="container mx-auto py-4 px-4">
              <nav className="flex flex-col gap-6 bg-white dark:bg-neutral-900 rounded-lg p-6">
                <SignedIn>
                  <Link
                    className="text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    href="/courses"
                    onClick={() => setIsOpen(false)}
                  >
                    Courses
                  </Link>
                  <Protect permission="org:owner:access">
                    <Link
                      className="text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  </Protect>
                  <Protect permission="org:content_creator:access">
                    <Link
                      className="text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      href="/content-studio"
                      onClick={() => setIsOpen(false)}
                    >
                      Content Studio
                    </Link>
                  </Protect>
                </SignedIn>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-base text-neutral-500 dark:text-neutral-400">
                    Theme
                  </span>
                  <ModeToggle />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
