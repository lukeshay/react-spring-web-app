package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.AuthenticationUtils;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class WallServiceImpl implements WallService {

  @Autowired private WallRepository wallRepository;
  @Autowired private GymRepository gymRepository;

  @Override
  public Wall createWall(Authentication authentication, Wall body) {
    User user = AuthenticationUtils.getUser(authentication);

    if (user == null || (body.getId() != null && !body.getId().equals(""))) {
      return null;
    }

    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);

    if (gym == null || !gym.getAuthorizedEditors().contains(user.getId())) {
      return null;
    }

    return wallRepository.save(body);
  }

  @Override
  public void deleteAllWalls() {
    wallRepository.deleteAll();
  }

  @Override
  public Wall deleteWall(Authentication authentication, String wallId) {
    User user = AuthenticationUtils.getUser(authentication);

    if (user == null) {
      return null;
    }

    Wall wall = wallRepository.findById(wallId).orElse(null);

    if (wall == null) {
      return new Wall();
    }

    Gym gym = gymRepository.findById(wall.getGymId()).orElse(null);

    if (gym == null || !gym.getAuthorizedEditors().contains(user.getId())) {
      return null;
    }

    wallRepository.deleteById(wallId);

    return wall;
  }

  @Override
  @Deprecated
  public List<Wall> getWalls(String gymId) {
    return wallRepository.findAllByGymId(gymId);
  }

  @Override
  public Page<Wall> getWalls(String query, Integer limit, Integer page) {
    if (limit == null || limit == 0) {
      limit = 20;
    }

    if (page == null || page == 0) {
      page = 1;
    }

    if (query == null) {
      query = "";
    }

    return wallRepository.findAllByNameContaining(
        PageRequest.of(page - 1, limit, Direction.ASC, "name"), query);
  }

  @Override
  public Wall updateWall(
      Authentication authentication,
      String wallId,
      String gymId,
      String updatedName,
      List<WallTypes> updatedTypes) {
    if (gymId == null || wallId == null) {
      return null;
    }

    User user = AuthenticationUtils.getUser(authentication);

    if (user == null) {
      return null;
    }

    Wall wall = wallRepository.findById(wallId).orElse(null);
    Gym gym = gymRepository.findById(gymId).orElse(null);

    if (gym == null || wall == null || !gym.getAuthorizedEditors().contains(user.getId())) {
      return null;
    }

    if (updatedName != null && !updatedName.equals("")) {
      wall.setName(updatedName);
    }

    if (updatedTypes != null && updatedTypes.size() > 0) {
      wall.setTypes(updatedTypes);
    }

    return wallRepository.save(wall);
  }
}
