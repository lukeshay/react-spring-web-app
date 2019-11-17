package io.lukeshay.restapi.todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Todo repository.
 */
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
