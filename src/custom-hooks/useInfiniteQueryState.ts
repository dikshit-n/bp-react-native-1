// customised infinite loading hook from react query
// reference - https://gist.github.com/Luccasoli/9b4ec6fbe87a702d9e87a09fa0b38d59

import {
	useInfiniteQuery,
	QueryKey,
	UseInfiniteQueryResult,
	UndefinedInitialDataInfiniteOptions,
	InfiniteData
} from "@tanstack/react-query";
import { UnwrapPagination, WITH_PAGINATION } from "src/types";
import { useRefetchOnFocus } from "src/custom-hooks";

interface USE_INFINIT_QUERY_STATE_RESULT<TData = unknown>
	extends Omit<UseInfiniteQueryResult<TData>, "data" | "isLoading"> {
	foundError: any;
}

interface USE_INFINITE_QUERY_OPTIONS<
	TQueryFnData,
	Error,
	TData,
	TQueryKey extends QueryKey = QueryKey
> extends Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, Error, TData, TQueryKey>,
		"initialPageParam" | "getNextPageParam"
	> {
	initialPageParam?: UndefinedInitialDataInfiniteOptions<
		TQueryFnData,
		Error,
		TData,
		TQueryKey
	>["initialPageParam"];
	getNextPageParam?: UndefinedInitialDataInfiniteOptions<
		TQueryFnData,
		Error,
		TData,
		TQueryKey
	>["getNextPageParam"];
}

export function useInfiniteQueryState<
	TQueryFnData = unknown,
	TError extends Error = Error,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey
>(
	options: USE_INFINITE_QUERY_OPTIONS<TQueryFnData, TError, TData, TQueryKey>
): [
	UnwrapPagination<TQueryFnData>,
	boolean,
	USE_INFINIT_QUERY_STATE_RESULT<TData>
] {
	const { data, isLoading, ...otherOptions } = useInfiniteQuery({
		initialPageParam: 1,
		getNextPageParam: (({
			metadata: { current_page, last_page }
		}: WITH_PAGINATION<TQueryFnData>) =>
			current_page < last_page ? current_page + 1 : undefined) as any,
		...options
	});

	// TODO: utilize foundError
	const returnOptions = {
		...otherOptions,
		foundError:
			otherOptions.isError && !otherOptions.isFetching
				? otherOptions.error
				: null
	};

	useRefetchOnFocus(returnOptions.refetch);

	return [
		(<any>data)?.pages.map((el) => el.collection).flat(1) || [],
		isLoading,
		returnOptions
	];
}
