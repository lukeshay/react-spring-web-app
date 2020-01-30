package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.gym.Gym;
import java.util.List;

public class GymWithWalls extends Gym {
  private List<WallWithRoutes> walls;

  public GymWithWalls(Gym gym, List<WallWithRoutes> walls) {
    super(
        gym.getId(),
        gym.getName(),
        gym.getAddress(),
        gym.getCity(),
        gym.getState(),
        gym.getZipCode(),
        gym.getWebsite(),
        gym.getEmail(),
        gym.getPhoneNumber(),
        gym.getLogoUrl(),
        gym.getPhotoUrl(),
        gym.getAuthorizedEditors());
    this.walls = walls;
  }
}
