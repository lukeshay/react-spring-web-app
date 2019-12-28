package com.lukeshay.restapi.todo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository extends MongoRepository<ToDo, String> {

  List<ToDo> findAllByUserId(String userId);
}
