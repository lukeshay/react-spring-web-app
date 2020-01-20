package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.gym.Gym;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GymWithWalls extends Gym {
  private List<WallWithRoutes> walls = new ArrayList<>();

  public GymWithWalls(Gym gym, List<WallWithRoutes> walls) {
    super(
        gym.getId(),
        gym.getCreatedDate(),
        gym.getModifiedDate(),
        gym.isPersistable(),
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
