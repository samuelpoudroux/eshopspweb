const globalSearch = (state, searchValue, globalSearchApi) => {
  const productSorted =
    globalSearchApi &&
    Object.fromEntries(
      Object.entries(globalSearchApi).map(([key, value]) => [
        key,
        Array.isArray(value)
          ? value.filter(
              (e) =>
                (e.name &&
                  e.name
                    .toLowerCase()
                    .includes(searchValue && searchValue.toLowerCase())) ||
                (e.shortDescription &&
                  e.shortDescription
                    .toLowerCase()
                    .includes(searchValue && searchValue.toLowerCase())) ||
                (e.category &&
                  e.category
                    .toLowerCase()
                    .includes(searchValue && searchValue.toLowerCase()))
            )
          : null,
      ])
    );

  const searchResult = {
    ...state,
    ...productSorted,
  };

  if (searchValue.length !== 0) {
    searchResult.active = true;
  } else {
    searchResult.active = false;
  }
  return searchResult;
};

export { globalSearch };
