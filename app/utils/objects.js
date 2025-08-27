export function camelCaseObjectKeys(obj) {
  const newObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCasedProperty = key.replace(/_./g, (match) =>
        match.charAt(1).toUpperCase(),
      );
      newObj[camelCasedProperty] = obj[key];
    }
  }

  return newObj;
}
