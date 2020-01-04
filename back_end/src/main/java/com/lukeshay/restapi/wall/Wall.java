package com.lukeshay.restapi.wall;

import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
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
public class Wall implements Persistable<String> {
  @Id @Expose private String id;

  @Expose private String gymId;
  @Expose private String name;
  @Expose private String type;
  @Expose private int routes;
  private boolean persistable;

  public Wall(String gymId, String name, String type) {
    this.gymId = gymId;
    this.name = name;
    this.type = type;
    this.routes = 0;
    persistable = false;
  }

  @Override
  public boolean isNew() {
    return !persistable;
  }

  @Override
  public String toString() {
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }

  @Override
  public boolean equals(Object obj) {
    if (!obj.getClass().equals(this.getClass())) {
      return false;
    } else {
      Wall wall = (Wall) obj;
      return toString().equals(wall.toString()) && persistable == wall.isPersistable();
    }
  }
}
