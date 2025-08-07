export const generateRandomData = () => {
  const count = 12;
  const min = 55;
  const max = 90;
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};
