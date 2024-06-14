export const fakeWait = (timeout = 1000): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
