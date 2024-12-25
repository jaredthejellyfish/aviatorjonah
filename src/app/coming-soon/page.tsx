import { InstagramIcon, LinkedinIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Scene = dynamic(() => import("@/components/Scene"));

export default function Home() {
	return (
		<main className={`relative w-full h-screen`}>
			<Scene />
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none">
				<h1 className="text-8xl font-bold text-primary mb-4 pointer-events-auto text-center text-white">
					AviatorJonah
				</h1>
				<p className="text-3xl text-primary mb-8 pointer-events-auto text-center text-white">
					Coming Soon!
				</p>
				<div id="socials" className="flex flex-col items-center justify-center gap-4">
					<Link href="https://www.instagram.com/aviatorjonah/" target="_blank" rel="noopener noreferrer">
						<InstagramIcon className="w-8 h-8 text-white" />
					</Link>
					<Link href="https://www.linkedin.com/company/aviatorjonah" target="_blank" rel="noopener noreferrer">
						<LinkedinIcon className="w-8 h-8 text-white" />
					</Link>
                    
				</div>
			</div>
		</main>
	);
}
