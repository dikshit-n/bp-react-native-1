// type declarations to save space inside component folders

import React, { FunctionComponent } from "react";
import { NavigationProp, Route } from "@react-navigation/native";

// reusable
export type UnwrapPagination<T> = T extends WITH_PAGINATION<infer U>
	? U
	: never;

// navigation
// TODO: update the typing to support tab navigation and stack navigation props
export type NAVIGATION_SCREEN = {
	name: SCREENS_NAMES;
	component?: React.ReactNode;
	options?: Object;
	nestedScreens?: NAVIGATION_SCREENS;
	type?: "stack" | "bottomTab";
	redirectOnAuthChange?: boolean;
};

export type SCREENS = {
	type?: NAVIGATION_SCREEN["type"];
	screens: NAVIGATION_SCREENS;
};

export type NAVIGATION_SCREENS = [NAVIGATION_SCREEN, ...NAVIGATION_SCREEN[]];

export type SCREENS_NAMES = "Home" | "Login" | "Authenticated Screens" | "Home";
export type ROOT_PARAM_LIST = Record<SCREENS_NAMES, any>;
export type NAVIGATION = NavigationProp<ROOT_PARAM_LIST>;

// api pagination
export type PAGINATION_OPTIONS = {
	limit?: number;
	page?: number;
	query?: string;
};

// api return data
type META_DATA = {
	current_page: number;
	from: number;
	last_page: number;
	limit: number;
	to: number;
	total: number;
};

export type WITH_PAGINATION<T = undefined> = {
	metadata: META_DATA;
	collection: T;
};

// tags
export type TAG = {
	id: number;
	name: string;
};

export type TAGS = TAG[];

// declare required props with FC type
declare module "react" {
	type WithNavigationFC<P = {}> = FunctionComponent<
		P & {
			route?: Route<any>;
			navigation?: NavigationProp<any>;
		}
	>;
}
