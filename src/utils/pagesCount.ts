export const pagesCount = (allItems: number, limit: number): number => {
  return Math.ceil(allItems / limit);
};

export const getPageArray = (pagesCount: number): number[] => {
  const result: number[] = [];
  for (let i: number = 0; i < pagesCount; i++) {
    result.push(i + 1);
  }
  return result;
};
