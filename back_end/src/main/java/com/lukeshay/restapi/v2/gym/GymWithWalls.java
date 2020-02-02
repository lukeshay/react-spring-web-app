package com.lukeshay.restapi.v2.gym;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.utils.ModelUtils;
import java.util.List;

public class GymWithWalls extends Gym {
  @Expose
  @JsonProperty(access = Access.READ_WRITE)
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

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }
}
