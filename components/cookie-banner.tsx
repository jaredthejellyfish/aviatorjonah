"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield } from "lucide-react";

interface CookieSetting {
	enabled: boolean;
	description: string;
	required?: boolean;
}

interface CookieSettings {
	necessary: CookieSetting;
	functional: CookieSetting;
	analytics: CookieSetting;
	marketing: CookieSetting;
}

type CookieKey = keyof CookieSettings;

const defaultSettings: CookieSettings = {
	necessary: {
		enabled: true,
		description: "Essential for website functionality and security",
		required: true,
	},
	functional: {
		enabled: false,
		description: "Enables enhanced features and personalization",
	},
	analytics: {
		enabled: false,
		description: "Helps us understand user behavior and improve our service",
	},
	marketing: {
		enabled: false,
		description: "Enables personalized content and targeted advertisements",
	},
};

const CookieBanner = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [settings, setSettings] = useState<CookieSettings>(defaultSettings);

	useEffect(() => {
		const cookiePreference = localStorage.getItem("cookiePreference");
		if (cookiePreference === null) {
			setIsVisible(true);
		}
	}, []);

	function saveCookiePreferences(pref: CookieSettings) {
		localStorage.setItem("cookiePreference", JSON.stringify(pref));
	}

	const handleAcceptAll = (): void => {
		const updatedSettings: CookieSettings = { ...settings };
		(Object.keys(updatedSettings) as Array<keyof CookieSettings>).forEach(
			(key) => {
				updatedSettings[key].enabled = true;
			},
		);
		setSettings(updatedSettings);
		saveCookiePreferences(updatedSettings);
		setIsVisible(false);
	};

	const handleToggle = (key: CookieKey): void => {
		if (settings[key].required) return;

		setSettings((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				enabled: !prev[key].enabled,
			},
		}));
	};

	const handleSavePreferences = (): void => {
		saveCookiePreferences(settings);
		setIsVisible(false);
	};

	const handleClose = (): void => {
		const updatedSettings: CookieSettings = { ...settings };
		(Object.keys(updatedSettings) as Array<keyof CookieSettings>).forEach(
			(key) => {
				updatedSettings[key].enabled = updatedSettings[key].required
					? true
					: false;
			},
		);
		saveCookiePreferences(updatedSettings);
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-lg bg-gray-900 shadow-2xl rounded-xl overflow-hidden z-50 border border-blue-900 animate-fade-in">
			<div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-3">
						<Cookie className="w-6 h-6 text-blue-400" />
						<h2 className="text-xl font-semibold text-blue-100">
							Privacy Preferences
						</h2>
					</div>
					<button
						onClick={handleClose}
						className="text-gray-400 hover:text-blue-300 transition-colors"
						aria-label="Close cookie banner"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="space-y-4">
					<div className="flex items-start space-x-3">
						<Shield className="w-5 h-5 text-blue-400 mt-1" />
						<p className="text-sm text-gray-300">
							We use cookies and similar technologies to enhance your browsing
							experience and analyze site usage. Your privacy is important to
							us.
						</p>
					</div>

					<div className="mt-6 space-y-4">
						{(Object.entries(settings) as [CookieKey, CookieSetting][]).map(
							([key, setting]) => (
								<div
									key={key}
									className={`p-4 rounded-lg ${setting.enabled ? "bg-gray-800/70" : "bg-gray-800/30"} 
                  transition-colors duration-200`}
								>
									<div className="flex items-start justify-between mb-1">
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<h3 className="text-sm font-medium text-gray-200 capitalize">
													{key}
													{setting.required && (
														<span className="ml-2 text-xs text-blue-400">
															(Required)
														</span>
													)}
												</h3>
												<label className="relative inline-flex items-center cursor-pointer">
													<input
														type="checkbox"
														checked={setting.enabled}
														onChange={() => handleToggle(key)}
														disabled={setting.required}
														className="sr-only peer"
													/>
													<div
														className={`w-11 h-6 rounded-full 
                          ${setting.enabled ? "bg-blue-500" : "bg-gray-600"} 
                          ${!setting.required ? "cursor-pointer" : "cursor-not-allowed"}
                          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-900 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                          `}
													/>
												</label>
											</div>
											<p className="mt-1 text-xs text-gray-400">
												{setting.description}
											</p>
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
					<button
						onClick={handleAcceptAll}
						className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium text-sm"
					>
						Accept All Cookies
					</button>
					<button
						onClick={handleSavePreferences}
						className="flex-1 px-4 py-2.5 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 border border-gray-700 transition duration-150 font-medium text-sm"
					>
						Confirm Choices
					</button>
				</div>
			</div>
		</div>
	);
};

export default CookieBanner;
