export const getLastPathVariable = (url: string): string => {
  const str = url
    .split("/")
    .splice(-1)
    .pop();
  return url || "";
};
