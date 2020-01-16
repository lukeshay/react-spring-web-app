export const convertGradeToString = (grade: string): string => {
  return grade
    .replace("GRADE_", "")
    .replace("_", ".")
    .toLowerCase();
};

export const convertStringToGrade = (str: string): string => {
  return "GRADE_" + str.replace(".", "_").toLowerCase();
};
