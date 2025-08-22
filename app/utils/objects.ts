export function camelCaseObjectKeys(obj: Record<string, any>): Record<string, any> {
	const newObj: Record<string, any> = {};

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const camelCasedProperty = key.replace(/_./g, (match) => match.charAt(1).toUpperCase());
			newObj[camelCasedProperty] = obj[key];
		}
	}

	return newObj;
}
