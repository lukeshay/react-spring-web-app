package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

public interface WallService {
  Logger LOG = LoggerFactory.getLogger(WallService.class.getName());

  Wall createWall(Authentication authentication, Wall body);

  void deleteAllWalls();

  Wall deleteWall(Authentication authentication, String wallId);

  @Deprecated
  List<Wall> getWalls(String gymId);

  Page<Wall> getWalls(String query, Integer limit, Integer page);

  Wall updateWall(
      Authentication authentication,
      String wallId,
      String gymId,
      String updatedName,
      List<WallTypes> updatedTypes);
}
