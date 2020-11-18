export const getDateWithHours = (date) => {
  return ` ${new Date(date).toLocaleDateString()} à ${new Date(
    date
  ).getHours()}:${new Date(date).getMinutes()}`;
};
