"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const MobileMenuButton = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: MobileMenuButtonProps) => {
	return (
		<div className="lg:hidden p-4 fixed top-0 right-0 z-40">
			<Button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="p-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
			>
				{isMobileMenuOpen ? <X /> : <Menu />}
			</Button>
		</div>
	);
};
