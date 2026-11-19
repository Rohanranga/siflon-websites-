'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	YoutubeIcon,
	LayoutDashboardIcon,
} from 'lucide-react';
import { Button } from './button';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative h-[720px] w-full', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed bottom-0 h-[720px] w-full bg-white border-t">
				<div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 px-4 py-8 md:px-12">
						<div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
							<AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
								<LayoutDashboardIcon className="size-8" />
								<p className="text-gray-600 mt-8 text-sm md:mt-0">
									Innovative specialist businesses empowering worldwide markets.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link, index) => (
										<Button size="icon" variant="outline" key={index} className="size-8">
											<link.icon className="size-4" />
										</Button>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm font-bold uppercase tracking-wider">{group.label}</h3>
										<ul className="text-gray-600 mt-4 space-y-2 text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<a
														href={link.href}
														className="hover:text-blue-600 inline-flex items-center transition-all duration-300"
													>
														{link.icon && <link.icon className="me-1 size-4" />}
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="text-gray-500 flex flex-col items-center justify-between gap-2 border-t pt-8 text-sm md:flex-row">
							<p>© {new Date().getFullYear()} Siflon Group. All rights reserved.</p>
							<p>Industrial & Pharmaceutical Specialities.</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: 'Facebook', href: '#', icon: FacebookIcon },
	{ title: 'Instagram', href: '#', icon: InstagramIcon },
	{ title: 'Youtube', href: '#', icon: YoutubeIcon },
	{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Divisions',
		links: [
			{ title: 'Siflon Pharma', href: '/businesses/siflon-pharma' },
			{ title: 'Siflon Drugs', href: '/businesses/siflon-drugs' },
			{ title: 'Siflon Polymers', href: '/businesses/siflon-polymers' },
			{ title: 'Siflon Pipes', href: '/businesses/siflon-pipes' },
		],
	},
	{
		label: 'Explore',
		links: [
			{ title: 'Products', href: '/products' },
			{ title: 'Gallery', href: '/gallery' },
			{ title: 'Resources', href: '/resources' },
			{ title: 'Locations', href: '/locations' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about' },
			{ title: 'Story', href: '/#story' },
			{ title: 'Capabilities', href: '/#capabilities' },
			{ title: 'Contact', href: '/#contact' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

