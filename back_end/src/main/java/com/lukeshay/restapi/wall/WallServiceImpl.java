package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.AuthenticationUtils;
import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.utils.ExceptionUtils;
import com.lukeshay.restapi.utils.PageableUtils;
import com.lukeshay.restapi.utils.ResponseUtils;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class WallServiceImpl implements WallService {

  @Autowired private WallRepository wallRepository;
  @Autowired private GymRepository gymRepository;

  @Override
  public ResponseEntity<?> createWall(Authentication authentication, Wall body) {
    User user = AuthenticationUtils.getUser(authentication);

    if (user == null || (body.getId() != null && !body.getId().equals(""))) {
      return ResponseUtils.badRequest(BodyUtils.error("Invalid wall."));
    }

    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);

    if (gym == null) {
      return ResponseUtils.badRequest(BodyUtils.error("Gym doesn't exist."));
    }
    if (!gym.getAuthorizedEditors().contains(user.getId())) {
      return ResponseUtils.unauthorized(BodyUtils.error("Not an editor."));
    }

    return ResponseUtils.ok(wallRepository.save(body));
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
  public ResponseEntity<Page<Wall>> getWalls(
      String gymId, String query, String sort, Integer limit, Integer page) {
    Gym gym =
        gymRepository
            .findById(gymId)
            .orElseThrow(() -> ExceptionUtils.badRequest("Gym does not exist."));

    if (query == null) {
      query = "";
    }

    Page<Wall> wallPage =
        wallRepository.findAllByGymIdAndNameIgnoreCaseContaining(
            PageableUtils.buildPageRequest(page, limit, sort), gymId, query);

    return ResponseUtils.okOfType(wallPage);
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
