package com.lukeshay.restapi.rating.route;

import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
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
public class RouteRatingControllerTest {

  private RouteRatingController ratingController;
  private User user;
  private RouteRatingService ratingService;
  private Route route;
  private RouteRating rating;

  @Autowired private RouteRatingRepository ratingRepository;
  @Autowired private RouteRepository routeRepository;

  @Mock private Requests requests;
  @Mock private HttpServletRequest request;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);

    user =
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

    route = new Route("a", "b", "c", "d", "e", Collections.singletonList(WallTypes.BOULDER));

    route = routeRepository.save(route);

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(user);

    rating = new RouteRating(route.getId(), "I like chicken", Grade.GRADE_5_9, 4);

    ratingController =
        new RouteRatingController(
            new RouteRatingService(ratingRepository, routeRepository, requests));
  }

  @AfterEach
  void tearDown() {
    routeRepository.deleteAll();
    ratingRepository.deleteAll();
  }

  @Test
  void createRatingTest() {
    ResponseEntity<?> response = ratingController.createRating(request, rating);

    rating = ratingRepository.findAll().get(0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(rating, response.getBody()));

    rating.setId(null);
    rating.setRouteId("");

    ResponseEntity<?> invalidRouteResponse = ratingController.createRating(request, rating);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, invalidRouteResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Bodys.error("Rating is invalid."), invalidRouteResponse.getBody()));

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(null);

    ResponseEntity<?> unauthorizedResponse = ratingController.createRating(request, rating);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(HttpStatus.UNAUTHORIZED, unauthorizedResponse.getStatusCode()),
        () -> Assertions.assertNull(unauthorizedResponse.getBody()));
  }

  @Test
  void getByWallIdTest() {
    List<RouteRating> ratings = new ArrayList<>();

    for (int i = 0; i < 10; i++) {
      RouteRating routeRating =
          new RouteRating(route.getId(), "I like chicken" + i, Grade.GRADE_5_9, 4);

      routeRating = ratingRepository.save(routeRating);

      ratings.add(routeRating);
    }

    ResponseEntity<?> response = ratingController.getRatings(route.getId());

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () ->
            Assertions.assertTrue(
                ratings.containsAll((Collection<?>) Objects.requireNonNull(response.getBody()))));
  }
}
