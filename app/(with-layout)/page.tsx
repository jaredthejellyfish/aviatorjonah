export const metadata = {
	title: "Home - AviatorJonah",
	description:
		"Welcome to AviatorJonah! Experience the power technology and aviation together to create a leading experience for all.",
};

import Hero from "@/components/hero";
import HomeFeatures from "@/components/home-features";

export default function Home() {
	return (
		<main>
			<Hero />
			<HomeFeatures />
		</main>
	);
}
