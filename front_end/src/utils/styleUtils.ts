export const shouldDisplay = (
  condition: boolean | null
): { display: "block" | "none" } => {
  return { display: condition ? "block" : "none" };
};

export const shouldBeVisible = (
  condition: boolean | null
): {
  visibility: "hidden" | "visible";
} => {
  return { visibility: condition ? "visible" : "hidden" };
};
