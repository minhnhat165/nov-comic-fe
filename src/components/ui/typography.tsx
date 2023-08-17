import { useMemo } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
export const typography = tv({
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			h2: 'scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl',
			h3: 'scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl',
			h4: 'scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl',
			h5: 'scroll-m-20 text-lg font-bold tracking-tight lg:text-xl',
			h6: 'scroll-m-20 text-base font-bold tracking-tight lg:text-lg',
			subtitle1:
				'scroll-m-20 text-lg font-medium tracking-tight lg:text-xl',
			subtitle2:
				'scroll-m-20 text-base font-medium tracking-tight lg:text-lg',
			body1: 'scroll-m-20 text-base tracking-tight lg:text-lg',
			body2: 'scroll-m-20 text-sm tracking-tight lg:text-base',
			button: 'scroll-m-20 text-base font-medium tracking-tight lg:text-lg',
			caption: 'scroll-m-20 text-sm tracking-tight lg:text-base',
			overline:
				'scroll-m-20 text-sm font-medium tracking-tight lg:text-base',
			link: 'scroll-m-20 text-base font-medium tracking-tight lg:text-lg',
		},

		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
		transform: {
			uppercase: 'uppercase',
			lowercase: 'lowercase',
			capitalize: 'capitalize',
			normalcase: 'normal-case',
		},
		decoration: {
			underline: 'underline',
			lineThrough: 'line-through',
			noUnderline: 'no-underline',
		},
		weight: {
			thin: 'font-thin',
			extralight: 'font-extralight',
			light: 'font-light',
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
			extrabold: 'font-extrabold',
			black: 'font-black',
		},
		letterSpacing: {
			tighter: 'tracking-tighter',

			tight: 'tracking-tight',

			normal: 'tracking-normal',

			wide: 'tracking-wide',

			wider: 'tracking-wider',

			widest: 'tracking-widest',

			1: 'tracking-1',

			2: 'tracking-2',

			3: 'tracking-3',

			4: 'tracking-4',

			5: 'tracking-5',

			6: 'tracking-6',
		},
	},
	defaultVariants: {
		variant: 'body1',
		color: 'black',
		align: 'left',
		transform: 'normalcase',
		decoration: 'noUnderline',
		weight: 'normal',
		letterSpacing: 'normal',
	},
});

export type TypographyVariants = VariantProps<typeof typography>;

export interface TypographyProps extends TypographyVariants {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	title?: string;
}

export const Typography = ({ className, ...props }: TypographyProps) => {
	const Component = useMemo(() => {
		switch (props.variant) {
			case 'subtitle1':
				return 'h3';
			case 'subtitle2':
				return 'h4';
			case 'body1':
				return 'p';
			case 'body2':
				return 'p';
			case 'button':
				return 'button';
			case 'caption':
				return 'span';
			case 'overline':
				return 'span';
			default:
				return props.variant || 'p';
		}
	}, [props.variant]);
	return (
		<Component
			{...props}
			className={typography({
				...props,
				className,
			})}
		>
			{props.children}
		</Component>
	);
};
