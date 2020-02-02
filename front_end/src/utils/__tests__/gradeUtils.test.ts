import * as GradeUtils from "../gradeUtils";

describe("GradeUtils", () => {
  it("convert a grade to a string.", () => {
    const grades = ["GRADE_5_5", "GRADE_5_12ab"];
    const expectedGrades = ["5.5", "5.12ab"];

    grades.forEach((value, index) => {
      expect(GradeUtils.convertGradeToString(value)).toEqual(
        expectedGrades[index]
      );
    });
  });

  it("convert a string to a grade.", () => {
    const grades = ["5.5", "5.12ab"];
    const expectedGrades = ["GRADE_5_5", "GRADE_5_12ab"];

    grades.forEach((value, index) => {
      expect(GradeUtils.convertStringToGrade(value)).toEqual(
        expectedGrades[index]
      );
    });
  });
});
