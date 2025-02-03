"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem, navItems } from "./navigation-items";
import BrandLogo from "./chat/CoPilotLogo";

interface SidebarProps {
	setMobileMenuOpen: (isOpen: boolean) => void;
	setSettingsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({
	setMobileMenuOpen,
	setSettingsOpen,
}: SidebarProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const pathname = usePathname();

	const sidebarVariants = {
		expanded: {
			width: 280,
			transition: {
				width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
			},
		},
		collapsed: {
			width: 80,
			transition: {
				width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
			},
		},
	};

	const textVariants = {
		show: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
		hide: {
			opacity: 0,
			x: -10,
			transition: {
				duration: 0.2,
				ease: "easeIn",
			},
		},
	};

	const NavLink = ({ item }: { item: NavItem }) => {
		const isActive =
			pathname === item.href ||
			(item.href !== "/copilot/dashboard" && pathname.startsWith(item.href));

		return (
			<Link
				href={item.href}
				onClick={() => setMobileMenuOpen(false)}
				className={`
          group w-full h-14 relative flex items-center
          ${isActive ? "text-blue-400" : "text-slate-300 hover:text-white"}
          transition-colors duration-200
        `}
			>
				{/* Fixed-width container for consistent spacing */}
				<div className="w-20 flex justify-center items-center">
					<div
						className={`
              flex items-center justify-center
              w-10 h-10 rounded-lg
              ${
								isActive
									? "bg-blue-500/10 border-blue-500/50"
									: "bg-slate-700/50 border-slate-600/50 group-hover:border-slate-500/50 group-hover:bg-slate-700/75"
							}
              border backdrop-blur-sm
              transition-colors duration-200
            `}
					>
						{isActive && (
							<div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg" />
						)}
						<item.icon className="w-5 h-5 relative z-10" />
					</div>
				</div>

				{/* Label container with absolute positioning */}
				<AnimatePresence mode="wait">
					{isExpanded && (
						<motion.div
							variants={textVariants}
							initial="hide"
							animate="show"
							exit="hide"
							className="absolute left-20 whitespace-nowrap"
						>
							{item.label}
						</motion.div>
					)}
				</AnimatePresence>

				{isActive && (
					<div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l" />
				)}
			</Link>
		);
	};

	return (
		<motion.nav
			onMouseEnter={() => {
				setIsExpanded(true);
			}}
			onMouseLeave={() => {
				setIsExpanded(false);
			}}
			initial="collapsed"
			animate={isExpanded ? "expanded" : "collapsed"}
			variants={sidebarVariants}
			className="hidden lg:flex flex-col bg-slate-800/50 backdrop-blur-md border-r border-slate-700/50 h-screen fixed top-0 left-0 overflow-hidden z-30 transform-gpu"
		>
			{/* Logo Section with fixed width container */}
			<div className="border-b border-slate-700/50">
				<div className="h-20 relative flex items-center">
					<div className="w-20 flex justify-center items-center relative">
						<AnimatePresence mode="wait">
							{isExpanded ? (
								<motion.div
									key="logo"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="absolute left-8"
								>
									<div className="flex items-center">
										<BrandLogo />
									</div>
								</motion.div>
							) : null}
						</AnimatePresence>
						{!isExpanded && (
							<div className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/50">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur-lg" />
								<Plane className="w-5 h-5 text-white relative z-10" />
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Navigation Items */}
			<div className="flex-1 py-4 overflow-y-auto scrollbar-hide">
				<div className="space-y-1">
					{navItems.map((item) => (
						<NavLink key={item.id} item={item} />
					))}
				</div>
			</div>

			{/* Settings Button with fixed width container */}
			<div className="border-t border-slate-700/50">
				<button
					onClick={() => setSettingsOpen(true)}
					className="h-20 w-full flex items-center group"
				>
					<div className="w-20 flex justify-center">
						<div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700/50 border border-slate-600/50 backdrop-blur-sm group-hover:bg-slate-700/75 group-hover:border-slate-500/50 transition-colors duration-200">
							<Settings className="w-5 h-5 text-slate-300" />
						</div>
					</div>

					<AnimatePresence mode="wait">
						{isExpanded && (
							<motion.div
								variants={textVariants}
								initial="hide"
								animate="show"
								exit="hide"
								className="absolute left-20 text-slate-300 whitespace-nowrap"
							>
								Settings
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</div>
		</motion.nav>
	);
};
