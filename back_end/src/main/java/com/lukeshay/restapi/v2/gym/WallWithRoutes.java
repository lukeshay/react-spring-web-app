package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.wall.Wall;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WallWithRoutes extends Wall {
  private List<Route> routes = new ArrayList<>();

  public WallWithRoutes(Wall wall, List<Route> routes) {
    super(wall.getId(), wall.getGymId(), wall.getName(), wall.getTypes());
    this.routes = routes;
  }
}
