package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.Collections;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

@SpringBootTest
@AutoConfigureDataMongo
public class GymControllerV2Test {
  @Autowired private GymV2Controller gymController;
  @Autowired private GymRepository gymRepository;
  @Autowired private WallRepository wallRepository;
  @Autowired private RouteRepository routeRepository;

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
            Collections.singletonList("1111111111"));

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

  @AfterEach
  void tearDown() {
    gymRepository.deleteAll();
    wallRepository.deleteAll();
    routeRepository.deleteAll();
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
