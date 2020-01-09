package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GymV2Service {
  private GymRepository gymRepository;
  private WallRepository wallRepository;
  private RouteRepository routeRepository;

  @Autowired
  public GymV2Service(
      GymRepository gymRepository, WallRepository wallRepository, RouteRepository routeRepository) {
    this.gymRepository = gymRepository;
    this.wallRepository = wallRepository;
    this.routeRepository = routeRepository;
  }

  public GymWithWalls getGym(String gymId) {
    Gym gym = gymRepository.findById(gymId).orElse(null);

    if (gym == null) {
      return null;
    }

    List<Wall> walls = wallRepository.findAllByGymId(gymId);

    List<WallWithRoutes> wallsWithRoutes = new ArrayList<>();

    for (Wall wall : walls) {
      List<Route> routes = routeRepository.findAllByWallId(wall.getId());
      WallWithRoutes wallWithRoutes = new WallWithRoutes(wall, routes);

      wallsWithRoutes.add(wallWithRoutes);
    }

    return new GymWithWalls(gym, wallsWithRoutes);
  }
}
