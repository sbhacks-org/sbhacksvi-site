export function getListForAdditionDropdown(const_opts, currentValue) {
	if(!currentValue) return const_opts;

	let found = false;

	const_opts.forEach(opt => opt.value === currentValue ? found = true : null);

	if(found === false) {
		return [{ text: currentValue, value: currentValue, key: currentValue }, ...const_opts];
	}

	return const_opts;
};
