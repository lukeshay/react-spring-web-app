package com.lukeshay.restapi.route;

public class RouteProperties {
  public enum Grade {
    GRADE_5_5,
    GRADE_5_6,
    GRADE_5_7,
    GRADE_5_8,
    GRADE_5_9,
    GRADE_5_10ab,
    GRADE_5_10cd,
    GRADE_5_11ab,
    GRADE_5_11cd,
    GRADE_5_12ab,
    GRADE_5_12cd,
    GRADE_5_13ab,
    GRADE_5_13cd,
    GRADE_5_14ab,
    GRADE_5_14cd,
    GRADE_5_15ab,
    GRADE_5_15cd;

    public double getValue() {
      switch (this) {
        case GRADE_5_6:
          return 1;
        case GRADE_5_7:
          return 2;
        case GRADE_5_8:
          return 3;
        case GRADE_5_9:
          return 4;
        case GRADE_5_10ab:
          return 5;
        case GRADE_5_10cd:
          return 5.5;
        case GRADE_5_11ab:
          return 6;
        case GRADE_5_11cd:
          return 6.5;
        case GRADE_5_12ab:
          return 7;
        case GRADE_5_12cd:
          return 7.5;
        case GRADE_5_13ab:
          return 8;
        case GRADE_5_13cd:
          return 8.5;
        case GRADE_5_14ab:
          return 9;
        case GRADE_5_14cd:
          return 9.5;
        case GRADE_5_15ab:
          return 10;
        case GRADE_5_15cd:
          return 10.5;
        default:
          return 0;
      }
    }

    public String asString() {
      return this.toString().replace("GRADE_", "").replace('_', '.');
    }

    public Grade getGrade(String grade) {
      if (grade.equals(GRADE_5_5.asString())) return GRADE_5_5;
      if (grade.equals(GRADE_5_6.asString())) return GRADE_5_6;
      if (grade.equals(GRADE_5_7.asString())) return GRADE_5_7;
      if (grade.equals(GRADE_5_8.asString())) return GRADE_5_8;
      if (grade.equals(GRADE_5_9.asString())) return GRADE_5_9;
      if (grade.equals(GRADE_5_10ab.asString())) return GRADE_5_10ab;
      if (grade.equals(GRADE_5_10cd.asString())) return GRADE_5_10cd;
      if (grade.equals(GRADE_5_11ab.asString())) return GRADE_5_11ab;
      if (grade.equals(GRADE_5_11cd.asString())) return GRADE_5_11cd;
      if (grade.equals(GRADE_5_12ab.asString())) return GRADE_5_12ab;
      if (grade.equals(GRADE_5_12cd.asString())) return GRADE_5_12cd;
      if (grade.equals(GRADE_5_13ab.asString())) return GRADE_5_13ab;
      if (grade.equals(GRADE_5_13cd.asString())) return GRADE_5_13cd;
      if (grade.equals(GRADE_5_14ab.asString())) return GRADE_5_14ab;
      if (grade.equals(GRADE_5_14cd.asString())) return GRADE_5_14cd;
      if (grade.equals(GRADE_5_15ab.asString())) return GRADE_5_15ab;
      if (grade.equals(GRADE_5_15cd.asString())) return GRADE_5_15cd;

      return null;
    }
  }

  public enum BoulderGrades {}
}
