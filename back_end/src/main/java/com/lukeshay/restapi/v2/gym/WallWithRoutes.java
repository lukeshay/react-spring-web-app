package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.wall.Wall;
import java.util.List;

public class WallWithRoutes extends Wall {
  private List<Route> routes;

  public WallWithRoutes(Wall wall, List<Route> routes) {
    super(wall.getId(), wall.getGymId(), wall.getName(), wall.getTypes());
    this.routes = routes;
  }
}
