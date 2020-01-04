package com.lukeshay.restapi.route;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class Route {
  private String name;
  private String setter;
  private List<String> types;
  private List<Grade> userGrade;
  private Grade averageGrade;
  private List<Integer> userRating;
  private Integer averageRating;
}
