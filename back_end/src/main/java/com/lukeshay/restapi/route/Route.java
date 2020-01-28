package com.lukeshay.restapi.route;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.Models;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Route extends Auditable<String> {
  @Id @GeneratedValue @Expose String id;

  @Expose String wallId;
  @Expose String gymId;

  @Expose private String name;
  @Expose private String setter;
  @Expose private String holdColor;
  @ElementCollection @Expose private List<WallTypes> types;

  @ElementCollection @Expose private List<Grade> userGrade = new ArrayList<>();
  @Expose private Grade averageGrade;
  @ElementCollection @Expose private List<Integer> userRating = new ArrayList<>();;
  @Expose private double averageRating;

  public Route(
      String wallId,
      String gymId,
      String name,
      String setter,
      String holdColor,
      List<WallTypes> types) {
    this.wallId = wallId;
    this.gymId = gymId;
    this.name = name;
    this.setter = setter;
    this.holdColor = holdColor;
    this.types = types;
  }

  public void addUserGrade(Grade grade) {
    userGrade.add(grade);
  }

  public void addUserRating(Integer rating) {
    userRating.add(rating);
  }

  public void updateAverages() {
    int numberGrades = userGrade.size();
    int numberRatings = userRating.size();
    double averageGrade;
    double averageRating;

    averageGrade = userGrade.stream().mapToDouble(Grade::getValue).sum() / numberGrades;
    averageRating = userRating.stream().mapToDouble(element -> element).sum() / numberRatings;

    setAverageRating(averageRating);
    setAverageGrade(Grade.getGrade(averageGrade));
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof Route && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
