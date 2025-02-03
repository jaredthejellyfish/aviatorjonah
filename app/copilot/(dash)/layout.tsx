// File: app/copilot/dashboard/layout.tsx
import CoPilotOnboarding from "@/components/copilot/onboarding";
import { SettingsProvider } from "@/components/copilot/SettingsProvider";
import { DashboardState } from "@/components/copilot/State";
import needsBetaAccess from "@/lib/supabase/helpers/needsBetaAccess";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { redirect: needsRedirect } = await needsBetaAccess();
	if (needsRedirect) {
		return redirect("/applications/beta");
	}

	return (
		<div className="min-h-screen bg-slate-900">
			<div className="flex">
				<SettingsProvider>
					<DashboardState>{children}</DashboardState>
					<CoPilotOnboarding />
				</SettingsProvider>
			</div>
		</div>
	);
}
