package com.lukeshay.restapi.rating.route;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RouteRatingRepository extends MongoRepository<RouteRating, String> {
  List<RouteRating> findAllByRouteId(String routeId);
}
