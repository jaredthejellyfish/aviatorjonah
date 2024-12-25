import { InstagramIcon, LinkedinIcon, TwitterIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Scene = dynamic(() => import("@/components/Scene"));

export default function Home() {
	return (
		<main className={`relative w-full h-screen`}>
			<Scene />
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none">
				<h1 className="text-7xl md:text-8xl font-extrabold text-primary mb-6 pointer-events-auto text-center text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
					AviatorJonah
				</h1>
				<p className="text-2xl md:text-3xl font-medium text-primary mb-12 pointer-events-auto text-center text-white/90 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
					Coming Soon!
				</p>
				<div
					id="socials"
					className="flex flex-row items-center justify-center gap-6 z-50 pointer-events-auto"
				>
					<Link
						href="https://www.instagram.com/aviatorjonahhq/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:scale-110 transition-transform duration-200"
					>
						<InstagramIcon className="w-8 h-8 text-white hover:text-white/90" />
					</Link>
					<Link
						href="https://www.linkedin.com/company/aviatorjonah/posts/?feedView=all"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:scale-110 transition-transform duration-200"
					>
						<LinkedinIcon className="w-8 h-8 text-white hover:text-white/90" />
					</Link>
					<Link
						href="https://x.com/AviatorJonahHQ"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:scale-110 transition-transform duration-200"
					>
						<TwitterIcon className="w-8 h-8 text-white hover:text-white/90" />
					</Link>
				</div>
			</div>
		</main>
	);
}
