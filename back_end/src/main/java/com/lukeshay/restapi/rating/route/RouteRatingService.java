package com.lukeshay.restapi.rating.route;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface RouteRatingService {
  Logger LOG = LoggerFactory.getLogger(RouteRatingService.class.getName());

  ResponseEntity<?> createRating(Authentication authentication, RouteRating rating);

  ResponseEntity<?> getRatingsByRouteId(String routeId);
}
