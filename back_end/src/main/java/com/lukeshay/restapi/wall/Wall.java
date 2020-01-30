package com.lukeshay.restapi.wall;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Auditable;
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
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "walls")
public class Wall extends Auditable<String> {
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

  public Wall() {}

  public Wall(String gymId, String name, List<WallTypes> types) {
    this.gymId = gymId;
    this.name = name;
    this.types = types;
  }

  public Wall(String id, String gymId, String name, List<WallTypes> types) {
    this.id = id;
    this.gymId = gymId;
    this.name = name;
    this.types = types;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getGymId() {
    return gymId;
  }

  public void setGymId(String gymId) {
    this.gymId = gymId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<WallTypes> getTypes() {
    return types;
  }

  public void setTypes(List<WallTypes> types) {
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
