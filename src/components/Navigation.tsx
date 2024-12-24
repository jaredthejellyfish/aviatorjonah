"use client";

import { SignInButton } from "@clerk/nextjs";
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
import { usePathname } from "next/navigation";
import ProtectClient from "./ProtectClient";

function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

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

	const isActivePath = (path: string) => pathname.startsWith(path);

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: "spring", stiffness: 100 }}
				className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm"
			>
				<div
					className="container mx-auto flex items-center justify-between"
					suppressHydrationWarning
				>
					<Link className="flex items-center shrink-0" href="/">
						<Plane className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-indigo-600 dark:text-indigo-400" />
						<span className="font-bold text-lg sm:text-xl text-indigo-600 dark:text-indigo-400">
							AviatorJonah
						</span>
					</Link>
					<nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
						<SignedIn>
							<ProtectClient orgSlug="admins">
								<Link
									className={`text-sm font-medium transition-colors hidden sm:inline-block ${
										isActivePath("/admin")
											? "text-indigo-600 dark:text-indigo-400"
											: "hover:text-indigo-600 dark:hover:text-indigo-400"
									}`}
									href="/admin"
								>
									Admin
								</Link>
							</ProtectClient>
							<ProtectClient orgSlug={["content-creators", "admins"]}>
								<Link
									className={`text-sm font-medium transition-colors hidden sm:inline-block ${
										isActivePath("/content-studio")
											? "text-indigo-600 dark:text-indigo-400"
											: "hover:text-indigo-600 dark:hover:text-indigo-400"
									}`}
									href="/content-studio"
								>
									Content Studio
								</Link>
							</ProtectClient>
							<Link
								className={`text-sm font-medium transition-colors hidden sm:inline-block ${
									isActivePath("/dashboard")
										? "text-indigo-600 dark:text-indigo-400"
										: "hover:text-indigo-600 dark:hover:text-indigo-400"
								}`}
								href="/dashboard"
							>
								Dashboard
							</Link>
						</SignedIn>
						<Link
							className={`text-sm font-medium transition-colors hidden sm:inline-block ${
								isActivePath("/courses")
									? "text-indigo-600 dark:text-indigo-400"
									: "hover:text-indigo-600 dark:hover:text-indigo-400"
							}`}
							href="/courses"
						>
							Courses
						</Link>
						<Link
							className={`text-sm font-medium transition-colors hidden sm:inline-block ${
								isActivePath("/blog")
									? "text-indigo-600 dark:text-indigo-400"
									: "hover:text-indigo-600 dark:hover:text-indigo-400"
							}`}
							href="/blog"
						>
							Blog
						</Link>
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<SignInButton mode="modal">
								<Button className="bg-indigo-600 text-white hover:bg-indigo-700">
									Login
								</Button>
							</SignInButton>
						</SignedOut>

						<ModeToggle className="sm:flex hidden" />

						<div className="sm:hidden p-0">
							<Hamburger
								size={20}
								toggled={isOpen}
								toggle={() => setIsOpen(!isOpen)}
							/>
						</div>
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
						onClick={(e) => {
							// Only close if clicking the backdrop itself, not its children
							if (e.target === e.currentTarget) {
								setIsOpen(false);
							}
						}}
					>
						<div className="container mx-auto py-4 px-4">
							<nav className="flex flex-col gap-6 bg-white dark:bg-neutral-900 rounded-lg p-6">
								<Link
									className={`text-base font-medium transition-colors ${
										isActivePath("/courses")
											? "text-indigo-600 dark:text-indigo-400"
											: "hover:text-indigo-600 dark:hover:text-indigo-400"
									}`}
									href="/courses"
									onClick={() => setIsOpen(false)}
								>
									Courses
								</Link>
								<Link
									className={`text-base font-medium transition-colors ${
										isActivePath("/blog")
											? "text-indigo-600 dark:text-indigo-400"
											: "hover:text-indigo-600 dark:hover:text-indigo-400"
									}`}
									href="/blog"
									onClick={() => setIsOpen(false)}
								>
									Blog
								</Link>
								<SignedIn>
									<Link
										className={`text-base font-medium transition-colors ${
											isActivePath("/dashboard")
												? "text-indigo-600 dark:text-indigo-400"
												: "hover:text-indigo-600 dark:hover:text-indigo-400"
										}`}
										href="/dashboard"
										onClick={() => setIsOpen(false)}
									>
										Dashboard
									</Link>

									<ProtectClient orgSlug="admins">
										<Link
											className={`text-base font-medium transition-colors ${
												isActivePath("/admin")
													? "text-indigo-600 dark:text-indigo-400"
													: "hover:text-indigo-600 dark:hover:text-indigo-400"
											}`}
											href="/admin"
											onClick={() => setIsOpen(false)}
										>
											Admin
										</Link>
									</ProtectClient>
									<ProtectClient orgSlug={["content-creators", "admins"]}>
										<Link
											className={`text-base font-medium transition-colors ${
												isActivePath("/content-studio")
													? "text-indigo-600 dark:text-indigo-400"
													: "hover:text-indigo-600 dark:hover:text-indigo-400"
											}`}
											href="/content-studio"
											onClick={() => setIsOpen(false)}
										>
											Content Studio
										</Link>
									</ProtectClient>
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
