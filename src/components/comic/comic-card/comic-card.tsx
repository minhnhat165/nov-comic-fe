import { Comic } from '@/types/comic';
import { DefaultComicCard } from './default-comic-card';
import { RecommendComicCard } from './recommend-comic-card';
import { TopComicCard } from './top-comic-card';

export interface ComicCardProps {
	data: Comic;
	variant?: 'default' | 'recommend' | 'top';
}

export const ComicCard = ({ data, variant = 'default' }: ComicCardProps) => {
	switch (variant) {
		case 'recommend':
			return <RecommendComicCard data={data} />;
		case 'top':
			return <TopComicCard />;
		default:
			return <DefaultComicCard data={data} />;
	}
};
