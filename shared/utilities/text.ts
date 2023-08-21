export const normalizeName = (
	name: string,
): string => {
	let result = name.replace(/\s/g, '-')
	result = result.replace(/[^-_a-zA-Z0-9\[\]]/g, '')
	return result.toLowerCase()
}

export const alphanumericName = (
	name: string,
): string => {
	let result = name.replace(/\s/g, '-')
	result = result.replace(/[^-_a-zA-Z0-9]/g, '')
	return result.toLowerCase()
}