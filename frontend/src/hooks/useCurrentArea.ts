import { useLocation } from "react-router";
import { useMemo } from 'react';
import { publicRoutes } from '@/config/routes/defaultRoutes';
import { AppArea } from '@/config/areas/areaConfig';

export const useCurrentArea = (): AppArea => {
	const location = useLocation();

	const currentArea = useMemo((): AppArea => {
		const pathname = location.pathname;




		// Check if it's a public route (authentication routes)
		if (publicRoutes.some(route => pathname.startsWith(route.path))) {
			return 'public';
		}

		// Default area for authenticated users
		return 'default';
	}, [location.pathname]);

	return currentArea;
};

export default useCurrentArea;