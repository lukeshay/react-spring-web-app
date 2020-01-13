export const getLastPathVariable = (url: string): string =>
  url
    .split("/")
    .splice(-1)
    .pop() || "";
