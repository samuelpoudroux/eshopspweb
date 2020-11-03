const setValuesLocalStorage = ({ value, name }, itemKey, autocomplete) => {
  let newObject = JSON.parse(localStorage.getItem(`${itemKey}`)) || {};
  if (autocomplete) {
    newObject[`${autocomplete}`] = value.label;
  } else {
    newObject[`${name}`] = value;
  }

  localStorage.setItem(`${itemKey}`, JSON.stringify(newObject));
};

const getDefaultValueLocalStorage = (key, itemKey) => {
  const value =
    localStorage.getItem(`${itemKey}`) &&
    JSON.parse(localStorage.getItem(`${itemKey}`))[`${key}`];
  return value;
};

const getInitialValue = (itemKey) => {
  const data =
    (localStorage.getItem(`${itemKey}`) &&
      JSON.parse(localStorage.getItem(`${itemKey}`))) ||
    {};
  return data;
};

export { setValuesLocalStorage, getDefaultValueLocalStorage, getInitialValue };
