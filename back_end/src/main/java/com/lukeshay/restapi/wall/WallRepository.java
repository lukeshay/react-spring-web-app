package com.lukeshay.restapi.wall;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WallRepository extends MongoRepository<Wall, String> {

  List<Wall> findAllByGymId(String gymId);
}
