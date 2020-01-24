package com.lukeshay.restapi.route;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.utils.Models;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Route implements Persistable<String> {
  @Id @Expose String id;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String createdDate;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String modifiedDate;

  @Expose String wallId;
  @Expose String gymId;

  @Expose private String name;
  @Expose private String setter;
  @Expose private String holdColor;
  @Expose private List<WallTypes> types;

  @Expose private List<Grade> userGrade = new ArrayList<>();
  @Expose private Grade averageGrade;
  @Expose private List<Integer> userRating = new ArrayList<>();;
  @Expose private double averageRating;
  private boolean persistable;

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
  public boolean isNew() {
    return !persistable;
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
