export const level_of_study = ["Bachelor's (Undergraduate)", "Masters (Graduate)", "Doctorate", "Other"].map((level) => (
	{ key: level, value: level, text: level }
));

export const graduation_year = [2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
	{ key: year.toString(), value: year, text: year.toString() }
));

const major_names = [
	"Computer Science",
	"Computer Engineering",
	"Electrical Engineering",
	"Software Engineering",
	"Mechanical Engineering",
	"Mathematics",
	"Physics",
	"Cognitive Science",
	"Applied Mathematics",
	"Electrical Engineering and Computer Science",
	"Statistics",
	"Chemical Engineering",
	"Economics",
	"Bioengineering"
];

export const major = major_names.map((major) => (
	{ key: major, value: major, text: major }
));

export const shirt_size = [
	{ key: "S", value: "S", text: "Small" },
	{ key: "M", value: "M", text: "Medium" },
	{ key: "L", value: "L", text: "Large" },
	{ key: "XL", value: "XL", text: "X-Large" },
	{ key: "XXL", value: "XXL", text: "XX-Large" }
];

export const gender = ["Male", "Female", "Non-Binary", "Other"].map(gender => (
	{ key: gender, value: gender, text: gender }
));

export const ethnicity = ["American Indian / Alaska Native", "Asian", "Black / African American", "Hispanic / Latino", "Native Hawaiian / Other Pacific Islander", "White", "Other"].map(ethnicity => (
	{ key: ethnicity, value: ethnicity, text: ethnicity }
));

export const transportation = [
	{ key: "1", value: "1", text: "I can provide my own means of transportation." },
	{ key: "2", value: "2", text: "I will take the buses provided by SB Hacks (Only select schools in California)" },
	{ key: "3", value: "3", text: "I require travel reimbursement to attend." },
];

export const dietary_restrictions = [
	"Vegetarian", "Vegan", "Paleo", "Lactose Intolerant", "None"
].map(dietary_restriction => (
	{ key: dietary_restriction, value: dietary_restriction, text: dietary_restriction }
));
