package com.lukeshay.restapi.todo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/** The interface Todo repository. */
@Repository
public interface ToDoRepository extends MongoRepository<ToDo, String> {

  /**
   * Find all by user id list.
   *
   * @param userId the user id
   * @return the list
   */
  List<ToDo> findAllByUserId(String userId);
}
