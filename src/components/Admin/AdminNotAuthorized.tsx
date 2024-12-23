"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Lock } from "lucide-react";

export default function UnauthorizedPage() {
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
    <main className="flex-1 flex items-center justify-center h-screen-bar">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-6 text-center"
      >
        <Card className="max-w-2xl mx-auto bg-white dark:bg-neutral-800 border-none shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <Lock className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-neutral-800 dark:text-neutral-200">
                Unauthorized Access
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg max-w-md mx-auto">
                Sorry, you don&apos;t have the necessary permissions to access
                this page. If you believe this is an error, please contact your
                administrator.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-8 space-y-4">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center justify-center">
                <AlertCircle className="mr-2 h-4 w-4" />
                Need help? Contact support
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
