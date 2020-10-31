export const upperCase = (value) => {
  const newValue = value.toLowerCase();
  return newValue[0].toUpperCase() + newValue.substring(1);
};
