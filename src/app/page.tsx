"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsScrolled } from "@/hooks/useIsScrolled";

const PopularCoursesSection = dynamic(
  () => import("@/components/Landing/PopularCoursesSection"),
  {
    ssr: false,
    loading: () => (
      <>
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-white dark:bg-neutral-900 shadow-lg"
          >
            <Skeleton className="w-full h-48" />
            <CardHeader className="pb-2 pt-5">
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </>
    ),
  }
);

export default function LandingPage() {
  const { isScrolled, scrollToElementId, scrollToTop } = useIsScrolled();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <main className="flex-1">
        <section
          className="relative w-full py-16 md:py-24 lg:py-32 bg-neutral-100 dark:bg-neutral-900 h-[calc(100vh-64px)] flex flex-col justify-center items-center border-b"
          id="cta"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 md:px-6 flex flex-col justify-center items-center"
          >
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Elevate Your Learning with{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    AviatorJonah
                  </span>
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-300">
                  Join our aviation community and discover the thrill of flight
                  through expert-led courses and cutting-edge training.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href="/courses" className="flex items-center gap-2">
                    Explore Courses
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 flex justify-center items-center">
              <ChevronDown
                onClick={() =>
                  !isScrolled
                    ? scrollToElementId("popular-courses")
                    : scrollToTop()
                }
                className={cn(
                  "h-10 w-10 text-indigo-500 transition-all duration-300 cursor-pointer",
                  isScrolled && "rotate-180 scale-90"
                )}
              />
            </div>
          </motion.div>
        </section>

        <section
          className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-white dark:bg-neutral-800 "
          id="popular-courses"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="container mx-auto px-4 md:px-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Popular Courses
            </motion.h2>
            <motion.div variants={containerVariants}>
              <PopularCoursesSection />
            </motion.div>
          </motion.div>
        </section>

        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-neutral-900 dark:to-neutral-800">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="container mx-auto px-4 md:px-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              What Our Learners Say
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-neutral-700 border-none shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4">
                      &quot;AviatorJonah has transformed the way I approach
                      online learning. The interface is intuitive, and the
                      course content is top-notch.&quot;
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">
                      - Sarah K., Software Developer
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-neutral-700 border-none shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4">
                      &quot;As an educator, I find AviatorJonah to be an
                      excellent platform for delivering my courses. The tools
                      for engagement are unparalleled.&quot;
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-purple-600 dark:text-purple-400">
                      - Dr. James L., University Professor
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-neutral-700 border-none shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4">
                      &quot;The certification programs on AviatorJonah have been
                      instrumental in advancing my career. Highly
                      recommended!&quot;
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-pink-600 dark:text-pink-400">
                      - Emily R., Marketing Specialist
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full border-t border-neutral-200 dark:border-neutral-700 py-8 sm:py-12 bg-white dark:bg-neutral-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                About Us
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                AviatorJonah LMS is dedicated to providing high-quality online
                education to learners worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {["Courses", "Pricing", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                        className="text-sm text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                Newsletter
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 text-sm text-neutral-900 bg-white border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-700 dark:text-neutral-100 dark:border-neutral-600"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © 2024 AviatorJonah LMS. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
