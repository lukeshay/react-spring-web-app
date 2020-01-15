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
          return 1.5;
        case GRADE_5_7:
          return 2.5;
        case GRADE_5_8:
          return 3.5;
        case GRADE_5_9:
          return 4.5;
        case GRADE_5_10ab:
          return 5.5;
        case GRADE_5_10cd:
          return 6.5;
        case GRADE_5_11ab:
          return 7.5;
        case GRADE_5_11cd:
          return 8.5;
        case GRADE_5_12ab:
          return 9.5;
        case GRADE_5_12cd:
          return 10.5;
        case GRADE_5_13ab:
          return 11.5;
        case GRADE_5_13cd:
          return 12.5;
        case GRADE_5_14ab:
          return 13.5;
        case GRADE_5_14cd:
          return 14.5;
        case GRADE_5_15ab:
          return 15.5;
        case GRADE_5_15cd:
          return 16.5;
        default:
          return 0.5;
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

    public static Grade getGrade(double value) {
      if (value < 1) {
        return GRADE_5_5;
      } else if (value < 2) {
        return GRADE_5_6;
      } else if (value < 3) {
        return GRADE_5_7;
      } else if (value < 4) {
        return GRADE_5_8;
      } else if (value < 5) {
        return GRADE_5_9;
      } else if (value < 6) {
        return GRADE_5_10ab;
      } else if (value < 7) {
        return GRADE_5_10cd;
      } else if (value < 8) {
        return GRADE_5_11ab;
      } else if (value < 9) {
        return GRADE_5_12ab;
      } else if (value < 10) {
        return GRADE_5_12cd;
      } else if (value < 11) {
        return GRADE_5_13ab;
      } else if (value < 12) {
        return GRADE_5_13cd;
      } else if (value < 13) {
        return GRADE_5_14ab;
      } else if (value < 14) {
        return GRADE_5_14cd;
      } else if (value < 15) {
        return GRADE_5_15ab;
      } else if (value < 16) {
        return GRADE_5_15cd;
      } else {
        return null;
      }
    }
  }
}
