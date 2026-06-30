const FilterObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  const filteredObj: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== '__all__' && !(Array.isArray(value) && value.length === 0)) {
      if (typeof value === 'boolean') {
        value = value.toString(); // Convert boolean to string as it ignored
      }

      if (key.endsWith('Operator')) {
        const baseKey = key.slice(0, -8); // Remove 'Operator' suffix
        if (obj[baseKey] !== undefined && obj[baseKey] !== '') {
          filteredObj[key] = value;
        }
      } else {
        filteredObj[key] = value;
      }
    }
  });
  // console.log(filteredObj);
  return filteredObj;
};

export default FilterObject;
