import { DocumentsList } from "@/components/copilot/docs/documents-list";

export const metadata = {
	title: "Copilot | Documents",
	description: "Manage your aviation documentation",
};

export default async function DocsPage() {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return (
		<div className="space-y-6 p-3 md:p-0">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-2xl font-semibold text-slate-200">Documents</h2>
					<p className="text-slate-400 text-sm">
						Manage your aviation documentation
					</p>
				</div>
			</div>

			<div className="space-y-6">
				<DocumentsList />
			</div>
		</div>
	);
}
