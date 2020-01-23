package com.lukeshay.restapi.route;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.Body;
import com.lukeshay.restapi.wall.Wall;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.Collections;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
@AutoConfigureDataMongo
public class RouteControllerTest {

  private RouteController routeController;
  private Route testRoute;
  private User user;
  private Wall testWall;
  private Gym testGym;

  @Autowired private RouteRepository routeRepository;

  @Mock private WallRepository wallRepository;
  @Mock private GymRepository gymRepository;
  @Mock private Requests requests;
  @Mock private HttpServletRequest request;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);

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

    testGym.setId("1");

    testWall = new Wall(testGym.getId(), "Wall", Collections.singletonList(WallTypes.BOULDER));

    User user =
        new User(
            "test.user@email.com",
            "Test",
            "User",
            "test.user@email.com",
            "1111111111",
            "Iowa",
            "USA",
            "password");
    user.setUserId("1111111111");

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(user);
    Mockito.when(wallRepository.findById("1")).thenReturn(Optional.of(testWall));
    Mockito.when(gymRepository.findById("1")).thenReturn(Optional.of(testGym));

    testRoute =
        new Route(
            "1", "1", "Yooty", "Yeety", "Green", Collections.singletonList(WallTypes.BOULDER));

    routeController =
        new RouteController(
            new RouteService(routeRepository, gymRepository, wallRepository, requests));
  }

  @AfterEach
  void tearDown() {
    routeRepository.deleteAll();
  }

  @Test
  void createRouteTest() {
    ResponseEntity<?> response = routeController.createRoute(request, testRoute);

    testRoute = routeRepository.findAll().get(0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testRoute, response.getBody()));

    Mockito.when(wallRepository.findById("1")).thenReturn(Optional.empty());

    ResponseEntity<?> responseNoWall = routeController.createRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWall.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Body.error("Error creating route."), responseNoWall.getBody()));

    Mockito.when(wallRepository.findById("1")).thenReturn(Optional.of(testWall));

    testGym.setAuthorizedEditors(Collections.emptyList());

    ResponseEntity<?> responseNotEditor = routeController.createRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNotEditor.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Body.error("Error creating route."), responseNotEditor.getBody()));
  }

  @Test
  void updateRouteTest() {
    testRoute = routeRepository.save(testRoute);

    testRoute.setName("YEET");

    ResponseEntity<?> response = routeController.updateRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testRoute, response.getBody()));

    Mockito.when(wallRepository.findById("1")).thenReturn(Optional.empty());

    ResponseEntity<?> responseNoWall = routeController.updateRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWall.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Body.error("Error updating route."), responseNoWall.getBody()));

    Mockito.when(wallRepository.findById("1")).thenReturn(Optional.of(testWall));

    testGym.setAuthorizedEditors(Collections.emptyList());

    ResponseEntity<?> responseNotEditor = routeController.updateRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNotEditor.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Body.error("Error updating route."), responseNotEditor.getBody()));
  }

  @Test
  void deleteRouteTest() {
    testRoute = routeRepository.save(testRoute);

    ResponseEntity<?> response = routeController.deleteRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(testRoute, response.getBody()));

    Mockito.when(wallRepository.findById("1")).thenReturn(Optional.empty());

    ResponseEntity<?> responseNoWall = routeController.deleteRoute(request, testRoute);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWall.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Body.error("Error deleting route."), responseNoWall.getBody()));
  }
}
