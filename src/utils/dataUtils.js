//The types of 'items' and 'conditions' are object arrays.
export const filterByConditions = (items, conditions) => {
  if (!items.length || !conditions.length) return items;

  const filteredData = items.filter((item) =>
    conditions.every(
      ({ key, value }) => value === "all" || item[key] === value,
    ),
  );

  return filteredData;
};

export const sortByField = (items, field, order = "asc") => {
  if (!items.length || !field) return items;

  const sortedItems = [...items].sort((firstObject, secondObject) => {
    const firstValue = firstObject[field];
    const secondValue = secondObject[field];

    if (field.toLowerCase().includes("date")) {
      return order === "asc"
        ? new Date(firstValue) - new Date(secondValue)
        : new Date(secondValue) - new Date(firstValue);
    } else {
      return order === "asc"
        ? firstValue.localeCompare(secondValue)
        : secondValue.localeCompare(firstValue);
    }
  });

  return sortedItems;
};

export const paginate = (items, itemsPerPage, currentPage) => {
  if (!items.length || !itemsPerPage) return items;

  const startPoint = (currentPage - 1) * itemsPerPage;
  const pagination = items.slice(startPoint, startPoint + itemsPerPage);

  return pagination;
};

export const searchByFields = (items, query, fields) => {
  if (!items.length || !query || !fields.length) return items;

  const searchedItems = items.filter((item) =>
    fields.some((field) =>
      item[field].toLowerCase().includes(query.toLowerCase()),
    ),
  );

  return searchedItems;
};
