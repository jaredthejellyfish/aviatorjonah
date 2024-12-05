"use client";

import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { Plane } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

function Navigation() {
  return (
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
          <Link
            className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:inline-block"
            href="/courses"
          >
            Courses
          </Link>
          <Link
            className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:inline-block"
            href="/dashboard"
          >
            Dashboard
          </Link>

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <ModeToggle />
        </nav>
      </div>
    </motion.header>
  );
}

export default Navigation;
