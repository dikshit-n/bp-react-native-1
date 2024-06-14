// utility hook to use debounce functionality in text input
// reference - https://stackoverflow.com/a/57335271

import { useEffect, useRef } from "react";

export function useDebounce<A extends any[]>() {
	// track args & timeout handle between calls
	const argsRef = useRef<A>();
	const timeout = useRef<ReturnType<typeof setTimeout>>();

	function cleanup() {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
	}

	// make sure our timeout gets cleared if
	// our consuming component gets unmounted
	useEffect(() => cleanup, []);

	return {
		debounce:
			(callback: (...args: A) => void, wait = 500) =>
			(...args: A) => {
				// capture latest args
				argsRef.current = args;

				// clear debounce timer
				cleanup();

				// start waiting again
				timeout.current = setTimeout(() => {
					if (argsRef.current) {
						callback(...argsRef.current);
					}
				}, wait);
			}
	};
}
