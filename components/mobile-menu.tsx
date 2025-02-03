import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="md:hidden col-span-3 flex justify-end">
			{/* Mobile menu button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="text-slate-300 hover:text-white focus:outline-none focus:text-white"
				aria-label="Toggle menu"
			>
				<svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
					{isOpen ? (
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
						/>
					) : (
						<path
							fillRule="evenodd"
							d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
						/>
					)}
				</svg>
			</button>

			{/* Mobile menu */}
			{isOpen && (
				<div className="absolute top-full left-0 w-full bg-slate-900/90 backdrop-blur-sm">
					<nav className="px-4 pt-2 pb-4">
						<ul className="space-y-2">
							{["CoPilot", "Updates", "About Us"].map((item) => (
								<li key={item}>
									<Link
										href={`/${item.toLowerCase()}`}
										className="block font-medium text-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
										onClick={() => setIsOpen(false)}
									>
										{item}
									</Link>
								</li>
							))}
							<li>
								<Link
									href="https://accounts.aviatorjonah.com"
									className="block font-medium text-sm text-white bg-[#1b264f] hover:bg-[#1b264f]/80 transition duration-150 ease-in-out rounded-full px-4 py-2 text-center"
									onClick={() => setIsOpen(false)}
								>
									Sign in
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
}
