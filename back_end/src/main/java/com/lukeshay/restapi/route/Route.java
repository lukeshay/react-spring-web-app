package com.lukeshay.restapi.route;

import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Route implements Persistable<String> {
  @Id @Expose String id;

  @Expose String wallId;
  @Expose String gymId;

  @Expose private String name;
  @Expose private String setter;
  @Expose private String holdColor;
  @Expose private List<WallTypes> types;

  @Expose private List<Grade> userGrade = new ArrayList<>();
  @Expose private Grade averageGrade;
  @Expose private List<Integer> userRating = new ArrayList<>();;
  @Expose private Integer averageRating;
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
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }
}
