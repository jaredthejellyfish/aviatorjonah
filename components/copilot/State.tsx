"use client";

import { useState } from "react";
import { MobileMenuButton } from "./MobileMenuButton";
import { Sidebar } from "./Sidebar";
import SettingsDialog from "components/copilot/settings/settings";

export const DashboardState = ({ children }: { children: React.ReactNode }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	return (
		<>
			<MobileMenuButton
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>
			<Sidebar
				setMobileMenuOpen={setIsMobileMenuOpen}
				setSettingsOpen={setIsSettingsOpen}
			/>
			<main className="lg:pl-28 w-full min-h-screen lg:p-6">{children}</main>
			<SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
		</>
	);
};
