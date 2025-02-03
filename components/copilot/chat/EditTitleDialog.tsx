import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditTitleDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (title: string) => Promise<void>;
	initialTitle: string;
}

export function EditTitleDialog({
	isOpen,
	onClose,
	onSubmit,
	initialTitle,
}: EditTitleDialogProps) {
	const [title, setTitle] = useState(initialTitle);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			await onSubmit(title);
			onClose();
		} catch (error) {
			console.error("Error updating title:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[425px] bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-xl">
				<DialogHeader>
					<DialogTitle className="text-slate-200">
						Edit Conversation Title
					</DialogTitle>
					<DialogDescription className="text-slate-400">
						Change the title of your conversation. This will be visible in your
						chat history.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title" className="text-slate-300">
							Title
						</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter conversation title"
							className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:ring-offset-slate-800"
						/>
					</div>
					<div className="flex justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-slate-100"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isSubmitting || !title.trim()}
							className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:from-slate-600 disabled:to-slate-600"
						>
							{isSubmitting ? (
								<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							) : (
								"Save Changes"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
