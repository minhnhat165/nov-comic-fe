import { useCallback, useEffect, useState } from 'react';

export const useHideOnScroll = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = useCallback(() => {
		const currentScrollPos = window.scrollY;

		setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

		setPrevScrollPos(currentScrollPos);
	}, [prevScrollPos]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return { visible };
};
