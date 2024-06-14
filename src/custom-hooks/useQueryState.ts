// customised react query hook

import {
	useQuery,
	UseQueryOptions,
	QueryKey,
	UseQueryResult,
	QueryClient
} from "@tanstack/react-query";
import { useRefetchOnFocus } from "src/custom-hooks";

interface USE_QUERY_STATE_RESULT<TData = unknown>
	extends Omit<UseQueryResult<TData>, "data" | "isLoading"> {
	foundError: any;
}

export const queryClient = new QueryClient();

export function useQueryState<
	TQueryFnData = unknown,
	TError extends Error = Error,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
>(
	options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): [TData, boolean, USE_QUERY_STATE_RESULT<TData>] {
	const { data, isLoading, ...otherOptions } = useQuery(options);

	// TODO: utilize foundError
	const returnOptions = {
		...otherOptions,
		foundError:
			otherOptions.isError && !otherOptions.isFetching
				? otherOptions.error
				: null
	};

	useRefetchOnFocus(returnOptions.refetch);

	return [data, isLoading, returnOptions];
}
