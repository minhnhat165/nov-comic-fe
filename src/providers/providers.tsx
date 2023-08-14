import { ThemeProvider } from '@/providers/theme-provider';

export interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			{props.children}
		</ThemeProvider>
	);
};
