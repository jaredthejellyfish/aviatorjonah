"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Users } from "lucide-react";

export default function LandingPage() {
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
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 py-2">
                  Elevate Your Learning with AviatorJonah
                </h1>
                <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400">
                  Soar through your courses with our cutting-edge Learning
                  Management System. Designed for modern learners and educators.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-x-2 sm:space-x-4"
              >
                <Button
                  asChild
                  size="sm"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 sm:text-base"
                >
                  <Link href="/courses">Courses</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-white dark:bg-neutral-800">
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
              Features that Set Us Apart
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-neutral-700 dark:to-neutral-600 border-none">
                  <CardContent className="flex flex-col items-center space-y-4 p-4 sm:p-6">
                    <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl sm:text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
                      Comprehensive Course Library
                    </h3>
                    <p className="text-sm sm:text-base text-center text-neutral-600 dark:text-neutral-300">
                      Access a wide range of courses tailored to your learning
                      needs.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-neutral-700 dark:to-neutral-600 border-none">
                  <CardContent className="flex flex-col items-center space-y-4 p-4 sm:p-6">
                    <Users className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl sm:text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
                      Collaborative Learning
                    </h3>
                    <p className="text-sm sm:text-base text-center text-neutral-600 dark:text-neutral-300">
                      Engage with peers and instructors in interactive learning
                      environments.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-gradient-to-br from-pink-50 to-indigo-50 dark:from-neutral-700 dark:to-neutral-600 border-none">
                  <CardContent className="flex flex-col items-center space-y-4 p-4 sm:p-6">
                    <Award className="h-8 w-8 sm:h-12 sm:w-12 text-pink-600 dark:text-pink-400" />
                    <h3 className="text-xl sm:text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
                      Certifications
                    </h3>
                    <p className="text-sm sm:text-base text-center text-neutral-600 dark:text-neutral-300">
                      Earn recognized certifications to boost your career
                      prospects.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
        className="w-full border-t border-neutral-200 dark:border-neutral-700 py-4 sm:py-6 px-4 md:px-6"
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            © 2024 AviatorJonah LMS. All rights reserved.
          </p>
          <nav className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
            <Link
              className="text-xs sm:text-sm text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs sm:text-sm text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </motion.footer>
    </>
  );
}
