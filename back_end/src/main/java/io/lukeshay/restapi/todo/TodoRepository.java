package io.lukeshay.restapi.todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Todo repository.
 */
@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
	/**
	 * Find all by user id list.
	 *
	 * @param userId the user id
	 * @return the list
	 */
	List<Todo> findAllByUserId(String userId);
}
