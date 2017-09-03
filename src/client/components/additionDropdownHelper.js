export function getListForAdditionDropdown(currentValue, const_opts) {
	let found = false;

	const_opts.forEach(opt => opt.value === currentValue ? found = true : null);

	if(found === false) {
		return [{ text: currentValue, value: currentValue, text: currentValue }, ...const_opts];
	}

	return const_opts;
};
