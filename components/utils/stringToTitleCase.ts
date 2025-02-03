const stringToTitleCase = (str: string) => {
	return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export { stringToTitleCase };
