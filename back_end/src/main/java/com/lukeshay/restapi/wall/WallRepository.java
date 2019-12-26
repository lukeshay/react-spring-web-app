package com.lukeshay.restapi.wall;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WallRepository extends MongoRepository<Wall, String> {}
