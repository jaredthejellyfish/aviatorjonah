import { TeamMember } from "@/types/about";
import Link from "next/link";
import TeamMemberCard from "@/components/about-us/TeamMemberCard";
import AnimatedHero from "@/components/about-us/AnimatedHero";

export const metadata = {
	title: "AviatorJonah | About Us",
	description: "Learn about the team behind AviatorJonah",
};

const teamMembers: TeamMember[] = [
	{
		name: "Jonah",
		role: "CFI & Founder",
		bio: "Hi, I'm Jonah, founder of AviatorJonah and a Certified Flight Instructor from Virginia. I discovered my passion for teaching aviation while earning my CFI. Seeing students struggle with traditional methods inspired me to create AviatorJonah—a platform designed to make learning aviation intuitive, engaging, and accessible.",
		image: "https://assets.aviatorjonah.com/jonah.png",
		email: "jonah@avjco.org",
	},
	{
		name: "You?",
		role: "Join Our Team",
		bio: "We're looking for passionate individuals who share our vision for revolutionizing aviation education. If you're excited about combining technology, education, and aviation to create meaningful impact, we'd love to hear from you.",
		image: "/api/placeholder/300/300",
		email: "careers@avjco.org",
	},
	{
		name: "You?",
		role: "Join Our Team",
		bio: "We're looking for passionate individuals who share our vision for revolutionizing aviation education. If you're excited about combining technology, education, and aviation to create meaningful impact, we'd love to hear from you.",
		image: "/api/placeholder/300/300",
		email: "careers@avjco.org",
		isJobOpening: true,
	},
];

export default function AboutPage(): JSX.Element {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
			<main>
				<AnimatedHero />

				{/* Story Section */}
				<section className="py-20 bg-slate-800/50 backdrop-blur-sm" id="story">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
							Our Story
						</h2>
						<p className="text-2xl text-center max-w-4xl mx-auto leading-relaxed text-blue-100">
							AviatorJonah began with a simple observation during flight
							training: aviation education needed a fresh perspective. Born from
							countless hours of instruction and student feedback, we developed
							a unique approach that combines storytelling with aviation
							expertise. Our platform isn&apos;t just about passing tests -
							it&apos;s about nurturing a deep understanding and passion for
							flight that stays with pilots throughout their careers.
						</p>
					</div>
				</section>

				{/* Team Section */}
				<section className="py-20 bg-slate-900/80">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
							Meet Our Team
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
							{teamMembers.map((member, index) => (
								<TeamMemberCard key={index} member={member} index={index} />
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Join Our Community
						</h2>
						<p className="text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
							Be part of a growing community of aviation enthusiasts and
							educators dedicated to transforming flight education.
						</p>
						<Link
							href="/coming-soon"
							className="inline-block bg-white text-blue-900 text-xl font-semibold py-4 px-12 rounded-full hover:bg-blue-100 transition-all duration-300 hover:scale-105"
						>
							Connect With Us
						</Link>
					</div>
				</section>
			</main>
		</div>
	);
}
