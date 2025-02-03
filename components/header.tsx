"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import {
	UserButton,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";

export default function Header({ firstName }: { firstName?: string | null }) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [showBanner, setShowBanner] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY) {
				// Scrolling down
				setShowBanner(false);
			} else {
				// Scrolling up
				setShowBanner(true);
			}

			setIsScrolled(currentScrollY > 10);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	const menuItems = ["CoPilot", "Updates", "About Us"];

	return (
		<>
			{/* Development Banner */}
			<div
				className={`
          bg-blue-600 text-white py-2 px-4 text-center font-semibold fixed w-full z-40
          transition-all duration-300 ease-in-out
          ${
						showBanner
							? "translate-y-0 opacity-100"
							: "-translate-y-full opacity-0"
					}
        `}
			>
				<p className="text-sm md:text-base">
					We are looking for Beta Testers for CoPilot -
					<Link
						href="/applications/beta"
						className="text-white font-bold hover:underline underline"
					>
						Apply Now
					</Link>
					!
				</p>
			</div>

			{/* Main Header */}
			<header
				className={`
          fixed w-full z-30 bg-slate-900/90 backdrop-blur-sm 
          transition-all duration-300 ease-in-out
          ${isScrolled ? "h-16" : "h-24"}
        `}
				style={{ top: showBanner ? "2.5rem" : "0" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
					<div
						className={`items-center justify-between h-full transition-all duration-300 grid grid-cols-4 ${
							isScrolled ? "py-2" : "py-4"
						}`}
					>
						{/* Site branding */}
						<div className="flex-shrink-0">
							<Logo
								className={`transition-all duration-300 ${
									isScrolled ? "h-8" : "h-12"
								}`}
							/>
						</div>

						{/* Desktop navigation */}
						<nav className="hidden md:flex md:grow w-full col-span-2">
							{/* Desktop menu links */}
							<ul className="flex grow justify-center items-center space-x-8">
								{menuItems.map((item) => (
									<li key={item}>
										<Link
											className={`relative z-[1] font-medium text-slate-300 hover:text-white transition-colors duration-300 ease-in-out 
                        ${isScrolled ? "text-sm" : "text-base"} px-3 py-2 
                        before:content-[''] before:absolute before:inset-[-2px] before:bg-white/10 before:rounded-md before:opacity-0 before:transition-opacity before:duration-300 before:-z-[1] hover:before:opacity-100
                        after:content-[''] after:absolute after:inset-[-2px] after:border after:border-white after:rounded-md after:opacity-0 after:transition-opacity after:duration-300 after:-z-[1] hover:after:opacity-100`}
											href={
												item === "Aviator's Classroom"
													? "/courses"
													: `/${item.toLowerCase().replace(/\s+/g, "-")}`
											}
										>
											{item}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Desktop sign in links */}
						<div className="hidden md:flex items-center space-x-4 justify-end">
							<SignedIn>
								<div className="flex items-center space-x-3 bg-slate-800 pl-4 py-2 rounded-lg pr-2.5">
									<span className="text-sm text-white font-semibold">
										{firstName}
									</span>
									<UserButton />
								</div>
							</SignedIn>
							<SignedOut>
								<SignInButton mode="modal">
									<button
										type="button"
										className={`relative z-[1] font-medium text-slate-300 hover:text-white transition-colors duration-300 ease-in-out 
                        ${isScrolled ? "text-sm" : "text-base"} px-3 py-2
                        before:content-[''] before:absolute before:inset-[-2px] before:bg-white/10 before:rounded-md before:opacity-0 before:transition-opacity before:duration-300 before:-z-[1] hover:before:opacity-100
                        after:content-[''] after:absolute after:inset-[-2px] after:border after:border-white after:rounded-md after:opacity-0 after:transition-opacity after:duration-300 after:-z-[1] hover:after:opacity-100`}
									>
										Sign in
									</button>
								</SignInButton>
								<SignUpButton mode="modal">
									<button
										type="button"
										className={`text-white bg-[#1b264f] hover:bg-[#1b264f]/80 transition duration-300 ease-in-out rounded-full ${
											isScrolled ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base"
										} transform hover:scale-110 hover:shadow-xl`}
									>
										<span className="flex items-center">
											Sign up{" "}
											<span className="ml-1" aria-hidden="true">
												&rarr;
											</span>
										</span>
									</button>
								</SignUpButton>
							</SignedOut>
						</div>

						<MobileMenu />
					</div>
				</div>
			</header>
		</>
	);
}
