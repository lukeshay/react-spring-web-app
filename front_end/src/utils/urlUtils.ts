export const getLastPathVariable = (url: string): string =>
  url.split("/").pop() || "";

export const getSecondLastPathVariable = (url: string): string => {
  const urlArr = url.split("/");
  urlArr.pop();

  return urlArr.pop() || "";
};
