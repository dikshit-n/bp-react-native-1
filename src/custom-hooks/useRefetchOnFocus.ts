// utility hook for refetch on focus bug in react query
// reference - https://github.com/TanStack/query/discussions/296#discussioncomment-3786773
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useAppState } from "src/custom-hooks";

export const useRefetchOnFocus = (refetch = () => {}, _canRefetch = true) => {
	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	useAppState({
		onForeground: refetch
	});
};
