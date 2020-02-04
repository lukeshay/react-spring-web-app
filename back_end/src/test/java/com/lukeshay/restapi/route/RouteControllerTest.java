package com.lukeshay.restapi.route;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.Collections;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class RouteControllerTest extends TestBase {

  private RouteController routeController;
  @Autowired private RouteService routeService;
  private Route testRoute;
  private Wall testWall;
  private Gym testGym;

  @BeforeEach
  void setUp() {
    testGym =
        gymRepository.save(
            new Gym(
                "Jim",
                "street",
                "city",
                "state",
                "50014",
                "lukeshay.com",
                "climbing@gym.com",
                "phoneNumber",
                Collections.singletonList(testUser.getId())));

    testWall =
        wallRepository.save(
            new Wall(testGym.getId(), "Wall", Collections.singletonList(WallTypes.BOULDER)));

    testRoute =
        new Route(
            testWall.getId(),
            testGym.getId(),
            "Yooty",
            "Yeety",
            "Green",
            Collections.singletonList(WallTypes.BOULDER));

    routeController = new RouteController(routeService);
  }

  @Test
  void createRouteTest() {
    ResponseEntity<?> response = routeController.createRoute(authentication, testRoute);

    testRoute = routeRepository.findAll().get(0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testRoute, response.getBody()));

    wallRepository.deleteAll();

    ResponseEntity<?> responseNoWall = routeController.createRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWall.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error creating route."), responseNoWall.getBody()));

    testWall.setId(null);
    testWall = wallRepository.save(testWall);

    testGym.setAuthorizedEditors(Collections.emptyList());
    testGym = gymRepository.save(testGym);

    ResponseEntity<?> responseNotEditor = routeController.createRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNotEditor.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error creating route."), responseNotEditor.getBody()));

    gymRepository.deleteAll();

    ResponseEntity<?> responseNoGym = routeController.createRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoGym.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error creating route."), responseNoGym.getBody()));
  }

  @Test
  void updateRouteTest() {
    testRoute = routeRepository.save(testRoute);

    testRoute.setName("YEET");

    ResponseEntity<?> response = routeController.updateRoute(authentication, testRoute);

    testRoute = routeRepository.findById(testRoute.getId()).get();

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testRoute, response.getBody()));

    wallRepository.deleteAll();

    ResponseEntity<?> responseNoWall = routeController.updateRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWall.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error updating route."), responseNoWall.getBody()));

    testWall.setId(null);
    testWall = wallRepository.save(testWall);

    testGym.setAuthorizedEditors(Collections.emptyList());
    testGym = gymRepository.save(testGym);

    ResponseEntity<?> responseNotEditor = routeController.updateRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNotEditor.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error updating route."), responseNotEditor.getBody()));
  }

  @Test
  void deleteRouteTest() {
    testRoute = routeRepository.save(testRoute);

    ResponseEntity<?> response = routeController.deleteRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testRoute, response.getBody()));

    routeRepository.deleteAll();

    ResponseEntity<?> responseNoRoute = routeController.deleteRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoRoute.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error deleting route."), responseNoRoute.getBody()));

    testGym.setAuthorizedEditors(Collections.emptyList());
    testGym = gymRepository.save(testGym);
    testRoute = routeRepository.save(testRoute);

    ResponseEntity<?> responseNotEditor = routeController.deleteRoute(authentication, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNotEditor.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error deleting route."), responseNotEditor.getBody()));
  }
}
