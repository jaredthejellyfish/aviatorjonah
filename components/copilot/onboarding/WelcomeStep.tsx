import React from "react";
import { Plane, Navigation, Clock, Settings } from "lucide-react";

interface FeatureBoxProps {
	Icon: React.ElementType;
	title: string;
	description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({
	Icon,
	title,
	description,
}) => (
	<div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
		<Icon className="w-6 h-6 text-cyan-500 mt-1 flex-shrink-0" />
		<div>
			<h3 className="font-semibold text-cyan-500">{title}</h3>
			<p className="text-gray-300">{description}</p>
		</div>
	</div>
);

const WelcomeStep: React.FC = () => {
	return (
		<div className="space-y-6">
			<div className="flex justify-center mb-8">
				<div className="bg-cyan-500 p-4 rounded-full">
					<Plane className="w-16 h-16 text-black" />
				</div>
			</div>

			<h1 className="text-3xl font-bold text-center text-cyan-500 mb-6">
				CoPilot x AviatorJonah
			</h1>

			<p className="text-lg text-center text-gray-400 mb-8">
				Your Personal Aviation Assistant
			</p>

			<div className="space-y-6">
				<FeatureBox
					Icon={Navigation}
					title="Smart Flight Planning"
					description="Intelligent route suggestions and weather analysis"
				/>
				<FeatureBox
					Icon={Clock}
					title="Real-time Assistance"
					description="24/7 support for weather updates and NOTAMs"
				/>
				<FeatureBox
					Icon={Settings}
					title="Personalized Experience"
					description="Customized to your aircraft and experience"
				/>
			</div>
		</div>
	);
};

export default WelcomeStep;
