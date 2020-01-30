package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.List;
import org.springframework.security.core.Authentication;

public interface WallService {

  Wall createWall(Authentication authentication, Wall body);

  void deleteAllWalls();

  Wall deleteWall(Authentication authentication, String wallId);

  List<Wall> getWalls(String gymId);

  Wall updateWall(
      Authentication authentication,
      String wallId,
      String gymId,
      String updatedName,
      List<WallTypes> updatedTypes);
}
