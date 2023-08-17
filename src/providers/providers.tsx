import { ReactQueryProvider } from '@/providers/react-query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<ReactQueryProvider> {props.children}</ReactQueryProvider>
		</ThemeProvider>
	);
};
