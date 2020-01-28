package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GymV2ServiceImpl implements GymV2Service {
  @Autowired private GymRepository gymRepository;
  @Autowired private WallRepository wallRepository;
  @Autowired private RouteRepository routeRepository;

  @Override
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
