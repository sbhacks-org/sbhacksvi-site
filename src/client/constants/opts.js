export const level_of_study = ["Bachelor's (Undergraduate)", "Masters (Graduate)", "Doctorate", "Other"].map((level) => (
	{ key: level, value: level, text: level }
));

export const graduation_year = [2017, 2018, 2019, 2020, 2021, 2022].map((year) => (
	{ key: year.toString(), value: year, text: year.toString() }
));

export const major = ["Computer Science", "Computer Engineering"].map((major) => (
	{ key: major, value: major, text: major }
));

export const shirt_size = [
	{ key: "S", value: "S", text: "Small" },
	{ key: "M", value: "M", text: "Medium" },
	{ key: "L", value: "L", text: "Large" },
	{ key: "XL", value: "XL", text: "X-Large" }
];

export const gender = [
	{ key: "Male", value: "Male", text: "Male" },
	{ key: "Female", value: "Female", text: "Female" },
	{ key: "Other", value: "Other", text: "Other" }
];

export const transportation = [
	{ key: "1", value: "1", text: "I can provide my own means of transportation." },
	{ key: "2", value: "2", text: "I will take the buses provided by SB Hacks (Only select schools in California)" },
	{ key: "3", value: "3", text: "I require travel reimbursement to attend." },
];