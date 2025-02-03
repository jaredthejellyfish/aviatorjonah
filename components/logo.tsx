import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	className?: string;
}

export default function Logo({ className = "h-8 md:h-10" }: LogoProps) {
	return (
		<Link
			href="/"
			className="block transition duration-300 ease-in-out transform hover:scale-105"
			aria-label="AviatorJonah"
		>
			<Image
				src="https://assets.aviatorjonah.com/white%20transparent.png"
				alt="AviatorJonah"
				width={200}
				height={80}
				className={`w-auto ${className} transition-all duration-300 ease-in-out`}
				priority
			/>
		</Link>
	);
}
