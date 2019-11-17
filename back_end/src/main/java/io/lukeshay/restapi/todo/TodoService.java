package io.lukeshay.restapi.todo;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * The type Todo service.
 */
@Service
public class TodoService {
	private static Logger logger = Logger.getLogger(TodoService.class.getName());
	private TodoRepository todoRepository;

	/**
	 * Instantiates a new Todo service.
	 *
	 * @param todoRepository the todo repository
	 */
	@Autowired
	public TodoService(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	/**
	 * Gets all todos from user.
	 *
	 * @param userId the user id
	 * @return the all todos from user
	 */
	public List<Todo> getAllTodosFromUser(String userId) {
		logger.info(String.format("Getting user %s todos.", userId));
		return todoRepository.findAllByUserId(userId);
	}

	/**
	 * Save todo todo.
	 *
	 * @param newTodo the new todo
	 * @return the todo
	 */
	public Todo saveTodo(Todo newTodo) {
		logger.info(String.format("Saving todo text: %s", newTodo.getText()));
		if (newTodo.getId() != null) {
			throw new IllegalArgumentException("Todo should not have an id.");
		}

		todoRepository.save(newTodo);
		return todoRepository.findById(newTodo.getId()).orElseThrow(() -> new IllegalArgumentException("Todo was not saved"));
	}

	/**
	 * Delete todo string.
	 *
	 * @param todoId the todo id
	 * @return the string
	 */
	public Todo deleteTodo(String todoId) {
		logger.info(String.format("Deleting todo id: %s", todoId));
		Todo deletedTodo = todoRepository.findById(todoId).get();
		todoRepository.deleteById(todoId);
		return deletedTodo;
	}

	/**
	 * Update todo todo.
	 *
	 * @param todoId      the todo id
	 * @param updatedTodo the updated todo
	 * @return the todo
	 */
	public Todo updateTodo(String todoId, Todo updatedTodo) {
		logger.info(String.format("Updating todo id: %s", todoId));
		Todo toUpdate = todoRepository.findById(todoId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid todoId"));

		toUpdate.update(updatedTodo);

		todoRepository.save(toUpdate);

		return todoRepository.findById(todoId)
				.orElseThrow(() -> new IllegalArgumentException(String.format("Todo %s is no longer in the database", todoId)));
	}

	public String deleteAllTodos() {
		logger.warning("DELETING ALL TODOS");
		todoRepository.findAll().forEach(todo -> todoRepository.delete(todo));

		return todoDeletedResponse("all", todoRepository.findAll().size() == 0);
	}

	private static String todoDeletedResponse(String todoId, boolean deleted) {
		Map<String, String> map = new HashMap<>();

		map.put("todoId", todoId);
		map.put("deleted", Boolean.toString(deleted));

		return new Gson().toJson(map);
	}

	public List<Todo> getAllTodos() {
		return todoRepository.findAll();
	}
}
