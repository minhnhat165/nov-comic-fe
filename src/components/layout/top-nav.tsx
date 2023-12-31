'use client';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { APP_NAME } from '@/configs';
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/utils/tw';
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll';

export interface TopNavProps {}

export const TopNav = (props: TopNavProps) => {
	const { visible } = useHideOnScroll();

	return (
		<>
			<div
				className={cn(
					'fixed bg-card top-0 left-0 right-0 z-10',
					visible
						? 'transform translate-y-0 transition-transform duration-200'
						: 'transform -translate-y-full transition-transform duration-200',
				)}
			>
				<div
					className={cn(
						'flex justify-between items-center h-14 px-4 border-b ',
					)}
				>
					<Link href="/">
						<Logo />
					</Link>
					<div className="flex gap-2">
						<ModeToggle />

						<Sheet>
							<SheetTrigger asChild>
								<Button size="icon" variant="outline">
									<Bars3BottomRightIcon className="w-6 h-6" />
								</Button>
							</SheetTrigger>
							<SheetContent className="w-[320px] sm:w-[540px]">
								<SheetHeader>
									<SheetTitle>
										Are you sure absolutely sure?
									</SheetTitle>
									<SheetDescription>
										This action cannot be undone. This will
										permanently delete your account and
										remove your data from our servers.
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</>
	);
};

const Logo = () => {
	return (
		<div className="flex items-center">
			<Typography
				style={{
					backgroundImage:
						'url(https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/05/Featured-Image-Shonen-Jump-wrong-better-Cropped.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundClip: 'text',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
				className="drop-shadow-lg"
				variant="h2"
				weight="bold"
			>
				{APP_NAME}
			</Typography>
		</div>
	);
};
