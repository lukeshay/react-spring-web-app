package com.lukeshay.restapi.route;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RouteRepository extends MongoRepository<Route, String> {

  List<Route> findAllByWallId(String wallId);
}
