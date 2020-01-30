package com.lukeshay.restapi.route;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.AuthenticationUtils;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class RouteServiceImpl implements RouteService {

  private RouteRepository routeRepository;
  private GymRepository gymRepository;
  private WallRepository wallRepository;

  @Autowired
  public RouteServiceImpl(
      RouteRepository routeRepository, GymRepository gymRepository, WallRepository wallRepository) {
    this.routeRepository = routeRepository;
    this.gymRepository = gymRepository;
    this.wallRepository = wallRepository;
  }

  @Override
  public Route createRoute(Authentication authentication, Route body) {
    User user = AuthenticationUtils.getUser(authentication);
    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);
    Wall wall = wallRepository.findById(body.getWallId()).orElse(null);

    if (user == null
        || gym == null
        || wall == null
        || gym.getAuthorizedEditors() == null
        || !gym.getAuthorizedEditors().contains(user.getId())
        || body.getName() == null
        || body.getHoldColor() == null
        || !wall.getGymId().equals(body.getGymId())) {
      return null;
    }

    body.setId(null);

    return routeRepository.save(body);
  }

  @Override
  public List<Route> getRoutesByWall(String wallId) {
    return routeRepository.findAllByWallId(wallId);
  }

  @Override
  public Route updateRoute(
      Authentication authentication,
      String id,
      String gymId,
      String wallId,
      List<WallTypes> types,
      String holdColor,
      String setter,
      String name) {
    User user = AuthenticationUtils.getUser(authentication);
    Route route = routeRepository.findById(id).orElse(null);
    Gym gym = gymRepository.findById(gymId).orElse(null);

    if (route == null
        || !route.getGymId().equals(gymId)
        || gym == null
        || user == null
        || !gym.getAuthorizedEditors().contains(user.getId())) {
      return null;
    }

    if (wallId != null && !wallId.toString().equals("")) {
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

    return routeRepository.save(route);
  }

  @Override
  public Route deleteRoute(Authentication authentication, Route body) {
    User user = AuthenticationUtils.getUser(authentication);
    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);

    if (body.getId() == null) {
      return null;
    }

    Route route = routeRepository.findById(body.getId()).orElse(null);

    if (route == null
        || gym == null
        || user == null
        || !route.getGymId().equals(body.getGymId())
        || !gym.getAuthorizedEditors().contains(user.getId())) {
      return null;
    }

    routeRepository.deleteById(route.getId());

    return route;
  }
}
