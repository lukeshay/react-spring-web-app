package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.Collections;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

public class GymControllerV2Test extends TestBase {
  @Autowired private GymV2Controller gymController;

  private Gym testGym;
  private Wall testWall;
  private Route testRoute;
  private GymWithWalls testGymWithWalls;

  @BeforeEach
  void setUp() {
    testGym =
        new Gym(
            "Jim",
            "street",
            "city",
            "state",
            "50014",
            "lukeshay.com",
            "climbing@gym.com",
            "phoneNumber",
            Collections.singletonList(testUser.getId()));

    testGym = gymRepository.save(testGym);

    testWall = new Wall(testGym.getId(), "Wall", Collections.singletonList(WallTypes.BOULDER));

    testWall = wallRepository.save(testWall);

    testRoute =
        new Route(
            testWall.getId(),
            testGym.getId(),
            "Yooty",
            "Yeety",
            "Green",
            Collections.singletonList(WallTypes.BOULDER));

    testRoute = routeRepository.save(testRoute);

    testGymWithWalls =
        new GymWithWalls(
            testGym,
            Collections.singletonList(
                new WallWithRoutes(testWall, Collections.singletonList(testRoute))));
  }

  @Test
  @WithMockUser
  void getGymTest() {
    ResponseEntity<?> response = gymController.getGym(null, testGym.getId());

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testGymWithWalls, response.getBody()));
  }
}
