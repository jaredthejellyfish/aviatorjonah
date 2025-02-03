"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { TeamMember } from "@/types/about";
import Image from "next/image";

export default function TeamMemberCard({
	member,
	index,
}: {
	member: TeamMember;
	index: number;
}): JSX.Element {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="relative group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="bg-gradient-to-b from-slate-800 to-blue-900/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
				<div className="aspect-square overflow-hidden">
					<Image
						src={member.image}
						alt={member.name}
						width={300}
						height={300}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<div className="p-8">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-2xl font-bold text-white tracking-tight">
							{member.name}
						</h3>
						{member.isJobOpening ? (
							<Link
								href="/careers"
								className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
							>
								Apply Now
							</Link>
						) : (
							<a
								href={`mailto:${member.email}`}
								className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
								onClick={(e) => e.stopPropagation()}
							>
								<Mail className="w-5 h-5" />
							</a>
						)}
					</div>
					<p className="text-blue-400 font-medium mb-2">{member.role}</p>
					<p className="text-blue-300 text-sm">{member.email}</p>
				</div>
				<div
					className={`absolute inset-0 bg-gradient-to-b from-slate-900/95 to-blue-900/95 transition-all duration-300
            ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				>
					<div className="p-8">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-2xl font-bold text-white tracking-tight">
								{member.name}
							</h3>
							{member.isJobOpening ? (
								<Link
									href="/careers"
									className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
								>
									Apply Now
								</Link>
							) : (
								<a
									href={`mailto:${member.email}`}
									className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
									onClick={(e) => e.stopPropagation()}
								>
									<Mail className="w-5 h-5" />
								</a>
							)}
						</div>
						<p className="text-blue-300 text-sm mb-6">{member.email}</p>
						<p className="text-blue-100 text-lg leading-relaxed">
							{member.bio}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
