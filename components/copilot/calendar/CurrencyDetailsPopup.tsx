"use client";

import type React from "react";
import { X, AlertCircle } from "lucide-react";
import type { Currency } from "types/calendar";

interface CurrencyDetailsPopupProps {
	currency: Currency;
	onClose: () => void;
}

const CurrencyDetailsPopup: React.FC<CurrencyDetailsPopupProps> = ({
	currency,
	onClose,
}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-gray-800 rounded-lg p-6 max-w-md w-full text-gray-100">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold text-yellow-400">
						Currency Details
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-200"
					>
						<X size={24} />
					</button>
				</div>
				<div className="mb-4">
					<div className="flex items-center mb-2">
						<AlertCircle size={24} className="text-yellow-500 mr-2" />
						<span className="font-semibold text-yellow-400 text-lg">
							{currency.name}
						</span>
					</div>
					<p className="text-gray-300">
						<strong>Expiration Date:</strong>{" "}
						{currency.expirationDate.toLocaleDateString()}
					</p>
					<p className="text-gray-300 mt-2">
						<strong>Description:</strong> {currency.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CurrencyDetailsPopup;
