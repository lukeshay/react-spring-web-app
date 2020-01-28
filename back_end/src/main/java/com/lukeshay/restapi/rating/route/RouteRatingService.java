package com.lukeshay.restapi.rating.route;

import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface RouteRatingService {

  ResponseEntity<?> createRating(Authentication authentication, RouteRating rating);

  ResponseEntity<?> getRatingsByRouteId(String routeId);
}
