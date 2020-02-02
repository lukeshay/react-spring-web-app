package com.lukeshay.restapi.v2.gym;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.utils.ModelUtils;
import com.lukeshay.restapi.wall.Wall;
import java.util.List;

public class WallWithRoutes extends Wall {
  @Expose
  @JsonProperty(access = Access.READ_WRITE)
  private List<Route> routes;

  public WallWithRoutes(Wall wall, List<Route> routes) {
    super(wall.getId(), wall.getGymId(), wall.getName(), wall.getTypes());
    this.routes = routes;
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }
}
