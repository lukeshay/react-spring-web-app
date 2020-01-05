package com.lukeshay.restapi.route;

import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Persistable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class Route implements Persistable<String> {
  @Id @Expose String id;

  @Expose String wallId;
  @Expose String gymId;

  @Expose private String name;
  @Expose private String setter;
  @Expose private List<WallTypes> types;
  @Expose private List<Grade> userGrade;
  @Expose private Grade averageGrade;
  @Expose private List<Integer> userRating;
  @Expose private Integer averageRating;
  private boolean persistable;

  @Override
  public boolean isNew() {
    return !persistable;
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof User && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }
}
