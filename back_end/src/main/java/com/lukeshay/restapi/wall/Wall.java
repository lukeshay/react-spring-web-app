package com.lukeshay.restapi.wall;

import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
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
public class Wall extends Auditable<String> {
  @Id @GeneratedValue @Expose private String id;

  @Expose private String gymId;
  @Expose private String name;
  @ElementCollection @Expose private List<WallTypes> types;

  public Wall(String gymId, String name, List<WallTypes> types) {
    this.gymId = gymId;
    this.name = name;
    this.types = types;
  }

  @Override
  public String toString() {
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }

  @Override
  public boolean equals(Object obj) {
    return obj.getClass().equals(this.getClass()) && toString().equals(((Wall) obj).toString());
  }
}
