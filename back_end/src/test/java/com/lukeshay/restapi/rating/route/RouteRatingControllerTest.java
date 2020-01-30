package com.lukeshay.restapi.rating.route;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class RouteRatingControllerTest extends TestBase {

  private RouteRatingController ratingController;
  @Autowired RouteRatingService routeRatingService;
  private Route route;
  private RouteRating rating;

  @BeforeEach
  void setUp() {
    route =
        new Route(
            UUID.randomUUID().toString(),
            UUID.randomUUID().toString(),
            "c",
            "d",
            "e",
            Collections.singletonList(WallTypes.BOULDER));

    route = routeRepository.save(route);

    rating = new RouteRating(route.getId(), "I like chicken", Grade.GRADE_5_9, 4);

    ratingController = new RouteRatingController(routeRatingService);
  }

  @Test
  void createRatingTest() {
    ResponseEntity<?> response = ratingController.createRating(authentication, rating);

    rating = routeRatingRepository.findAll().get(0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(rating, response.getBody()));

    rating.setId(null);
    rating.setRouteId(UUID.randomUUID().toString());

    ResponseEntity<?> invalidRouteResponse = ratingController.createRating(authentication, rating);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, invalidRouteResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Rating is invalid."), invalidRouteResponse.getBody()));
  }

  @Test
  void getByWallIdTest() {
    List<RouteRating> ratings = new ArrayList<>();

    for (int i = 0; i < 10; i++) {
      RouteRating routeRating =
          new RouteRating(route.getId(), "I like chicken" + i, Grade.GRADE_5_9, 4);

      routeRating = routeRatingRepository.save(routeRating);

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
