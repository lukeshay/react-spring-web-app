package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    LOG.debug("Found gym: {}", gym);

    if (gym == null) {
      return null;
    }

    List<Wall> walls = wallRepository.findAllByGymId(gymId);

    LOG.debug("Found walls: {}", Arrays.toString(walls.toArray()));

    List<WallWithRoutes> wallsWithRoutes = new ArrayList<>();

    walls.forEach(
        (wall) -> {
          List<Route> routes = routeRepository.findAllByWallId(wall.getId());
          wallsWithRoutes.add(new WallWithRoutes(wall, routes));
        });

    return new GymWithWalls(gym, wallsWithRoutes);
  }
}
