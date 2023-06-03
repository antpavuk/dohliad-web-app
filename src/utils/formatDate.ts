const formatDate = (date: Date | string | number): string => {
  const parsedDate = new Date(date);

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = String(parsedDate.getFullYear());

  return `${day}-${month}-${year}`;
};

export default formatDate;
