package com.lukeshay.restapi.route;

import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import org.springframework.security.core.Authentication;

public interface RouteService {

  Route createRoute(Authentication authentication, Route body);

  List<Route> getRoutesByWall(String wallId);

  Route updateRoute(
      Authentication authentication,
      String id,
      String gymId,
      String wallId,
      List<WallTypes> types,
      String holdColor,
      String setter,
      String name);

  Route deleteRoute(Authentication authentication, Route body);
}
