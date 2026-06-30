import React from 'react';
import { CustomRoutes } from '@/interface/common';

// Layout imports
import {DefaultLayout, PublicLayout } from '@/components/Layout';

// Route imports
import {defaultRoutes, publicRoutes } from '@/config/routes';
export interface AreaConfiguration {
	name: string;
	layout: React.ComponentType;
	routes: CustomRoutes[];
	requiresAuth: boolean;
	styleSheet?: string;
	dashboardPath?: string;
}

export type AppArea = 'public' | 'default' ;
export const AppAreaList : AppArea[] = ['public', 'default', ];

export const areaConfigurations: Record<AppArea, AreaConfiguration> = {
	public: {
		name: 'Public',
		layout: PublicLayout,
		routes: publicRoutes,
		requiresAuth: false,
		styleSheet: 'project-default.css',
		dashboardPath: '/',
	},
	default: {
		name: 'Default Area',
		layout: DefaultLayout,
		routes: defaultRoutes,
		requiresAuth: true,
		styleSheet: 'default.css',
		dashboardPath: '/dashboard',
	}
};

// Helper functions
export const getAreaConfig = (area: AppArea): AreaConfiguration => {
	return areaConfigurations[area];
};

export const getAreaLayout = (area: AppArea): React.ComponentType => {
	return areaConfigurations[area].layout;
};

export const getAreaRoutes = (area: AppArea): CustomRoutes[] => {
	return areaConfigurations[area].routes;
};


export const getAreaDashboardPath = (area: AppArea): string => {
	return areaConfigurations[area].dashboardPath || '/';
};
