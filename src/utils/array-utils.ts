export const removeDuplicates = (array: string[]) =>
	array.filter((item, index) => array.indexOf(item) === index);
