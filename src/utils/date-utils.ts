// import { getFormatedDate as formatedDate } from "react-native-modern-datepicker";
import moment, { Moment } from "moment";

// export const getDateString = (date) => {
//     if (date) {
//         return formatedDate(new Date(date), 'DD/MM/YYYY');
//     };
//     return '';
// };

export const getTimeStamp = (date?: string) => {
	if (date) {
		const parts = date.split("/"); // Your date in yyyy/MM/dd format
		const year = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
		const day = parseInt(parts[2], 10);
		// Create a Date object and convert it to a timestamp
		const newDate = new Date(year, month, day);
		return newDate.toISOString();
	}
	return null;
};

export const getReadableDate = (date) => {
	if (date && new Date(date)) {
		date = new Date(date);
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		const day = date.getDate().toString().padStart(2, "0");
		const monthIndex = date.getMonth();
		const monthName = monthNames[monthIndex];
		const year = date.getFullYear();

		return `${monthName} ${day}, ${year}`;
	}
	return null;
};

export const getFormattedDate = (date) => {
	if (date) {
		const convDate = new Date(date);
		const year = convDate.getFullYear();
		const month = String(convDate.getMonth() + 1).padStart(2, "0");
		const day = String(convDate.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}
	return undefined;
};

export const getHumanizedDuration = (fromDate: Date | Moment | string) =>
	moment.duration(moment(fromDate).diff(moment())).humanize(true);

export const calculateDate = (
	date: Date | number,
	days?: number,
	months?: number,
	years?: number
) => {
	const updatedDate = new Date(date);
	if (days >= 0) {
		updatedDate.setDate(updatedDate.getDate() + days);
	}
	if (months >= 0) {
		updatedDate.setMonth(updatedDate.getMonth() + months);
	}
	if (years >= 0) {
		updatedDate.setFullYear(updatedDate.getFullYear() + years);
	}
	return updatedDate;
};
