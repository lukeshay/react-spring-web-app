package com.lukeshay.restapi.route;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RouteService {

  private RouteRepository routeRepository;
  private GymRepository gymRepository;
  private WallRepository wallRepository;
  private Requests requests;

  @Autowired
  public RouteService(
      RouteRepository routeRepository,
      GymRepository gymRepository,
      WallRepository wallRepository,
      Requests requests) {
    this.routeRepository = routeRepository;
    this.gymRepository = gymRepository;
    this.wallRepository = wallRepository;
    this.requests = requests;
  }

  public Route createRoute(HttpServletRequest request, Route body) {
    User user = requests.getUserFromRequest(request);
    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);
    Wall wall = wallRepository.findById(body.getWallId()).orElse(null);

    if (user == null
        || gym == null
        || wall == null
        || gym.getAuthorizedEditors() == null
        || !gym.getAuthorizedEditors().contains(user.getUserId())
        || body.getName() == null
        || body.getHoldColor() == null
        || !wall.getGymId().equals(body.getGymId())) {
      return null;
    }

    body.setId(null);

    return routeRepository.save(body);
  }

  public List<Route> getRoutesByWall(String wallId) {
    return routeRepository.findAllByWallId(wallId);
  }

  public Route updateRoute(
      HttpServletRequest request,
      String id,
      String gymId,
      String wallId,
      List<WallTypes> types,
      String holdColor,
      String setter,
      String name) {
    User user = requests.getUserFromRequest(request);
    Route route = routeRepository.findById(id).orElse(null);
    Gym gym = gymRepository.findById(gymId).orElse(null);

    if (route == null
        || !route.getGymId().equals(gymId)
        || gym == null
        || user == null
        || !gym.getAuthorizedEditors().contains(user.getUserId())) {
      return null;
    }

    if (wallId != null && !wallId.equals("")) {
      Wall newWall = wallRepository.findById(wallId).orElse(null);

      if (newWall != null && newWall.getGymId() != null && newWall.getGymId().equals(gymId)) {
        route.setWallId(wallId);
      } else {
        return null;
      }
    }

    if (types != null && types.size() > 0) {
      route.setTypes(types);
    }

    if (holdColor != null && !holdColor.equals("")) {
      route.setHoldColor(holdColor);
    }

    if (setter != null && !setter.equals("")) {
      route.setSetter(setter);
    }

    if (name != null && !name.equals("")) {
      route.setName(name);
    }

    route.setPersistable(true);

    return routeRepository.save(route);
  }

  public Route deleteRoute(HttpServletRequest request, Route body) {
    User user = requests.getUserFromRequest(request);
    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);

    if (body.getId() == null) {
      return null;
    }

    Route route = routeRepository.findById(body.getId()).orElse(null);

    if (route == null
        || gym == null
        || user == null
        || !route.getGymId().equals(body.getGymId())
        || !gym.getAuthorizedEditors().contains(user.getUserId())) {
      return null;
    }

    routeRepository.deleteById(route.getId());

    return route;
  }
}
