package com.lukeshay.restapi.wall;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.ModelUtils;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "walls")
public class Wall { // extends Auditable<String> {
  @Column(name = "id", unique = true, updatable = false)
  @Expose
  @GeneratedValue(generator = "pg-uuid")
  @GenericGenerator(name = "pg-uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @Id
  private String id;

  @Column(name = "gym_id")
  @Expose
  private String gymId;

  @Column(name = "name")
  @Expose
  private String name;

  @Column(name = "types")
  @ElementCollection(fetch = FetchType.EAGER)
  @Expose
  private List<WallTypes> types;

  public Wall(String gymId, String name, List<WallTypes> types) {
    this.gymId = gymId;
    this.name = name;
    this.types = types;
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }

  @Override
  public boolean equals(Object obj) {
    return ModelUtils.equals(this, obj);
  }
}
