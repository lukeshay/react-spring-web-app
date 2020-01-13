package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WallService {

  private WallRepository wallRepository;
  private GymRepository gymRepository;
  private Requests requests;

  @Autowired
  public WallService(
      WallRepository wallRepository, GymRepository gymRepository, Requests requests) {
    this.wallRepository = wallRepository;
    this.gymRepository = gymRepository;
    this.requests = requests;
  }

  public Wall createWall(HttpServletRequest request, Wall body) {
    User user = requests.getUserFromRequest(request);

    if (user == null || (body.getId() != null && !body.getId().equals(""))) {
      return null;
    }

    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);

    if (gym == null || !gym.getAuthorizedEditors().contains(user.getUserId())) {
      return null;
    }

    return wallRepository.save(body);
  }

  public Wall updateWall(
      HttpServletRequest request,
      String wallId,
      String gymId,
      String updatedName,
      List<WallTypes> updatedTypes) {
    if (gymId == null || wallId == null) {
      return null;
    }

    User user = requests.getUserFromRequest(request);

    if (user == null) {
      return null;
    }

    Wall wall = wallRepository.findById(wallId).orElse(null);
    Gym gym = gymRepository.findById(gymId).orElse(null);

    if (gym == null || wall == null || !gym.getAuthorizedEditors().contains(user.getUserId())) {
      return null;
    }

    if (updatedName != null && !updatedName.equals("")) {
      wall.setName(updatedName);
    }

    if (updatedTypes != null && updatedTypes.size() > 0) {
      wall.setTypes(updatedTypes);
    }

    wall.setPersistable(true);

    return wallRepository.save(wall);
  }

  public Wall deleteWall(HttpServletRequest request, String wallId) {
    User user = requests.getUserFromRequest(request);

    if (user == null) {
      return null;
    }

    Wall wall = wallRepository.findById(wallId).orElse(null);

    if (wall == null) {
      return new Wall();
    }

    Gym gym = gymRepository.findById(wall.getGymId()).orElse(null);

    if (gym == null || !gym.getAuthorizedEditors().contains(user.getUserId())) {
      return null;
    }

    wallRepository.deleteById(wallId);

    return wall;
  }

  public List<Wall> getWalls(String gymId) {
    return wallRepository.findAllByGymId(gymId);
  }

  public void deleteAllWalls() {
    wallRepository.deleteAll();
  }
}
