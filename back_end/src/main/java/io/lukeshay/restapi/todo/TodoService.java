package io.lukeshay.restapi.todo;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type Todo service.
 */
@Service
public class TodoService {
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
		return todoRepository.findAllByUserId(userId);
	}

	/**
	 * Save todo todo.
	 *
	 * @param newTodo the new todo
	 * @return the todo
	 */
	public Todo saveTodo(Todo newTodo) {
		todoRepository.save(newTodo);
		return todoRepository.findById(newTodo.getId()).orElseThrow(() -> new IllegalArgumentException("Todo was not saved"));
	}

	/**
	 * Delete todo string.
	 *
	 * @param todoId the todo id
	 * @return the string
	 */
	public String deleteTodo(String todoId) {
		todoRepository.deleteById(todoId);
		return todoDeletedResponse(todoId, !todoRepository.existsById(todoId));
	}

	/**
	 * Update todo todo.
	 *
	 * @param todoId      the todo id
	 * @param updatedTodo the updated todo
	 * @return the todo
	 */
	public Todo updateTodo(String todoId, Todo updatedTodo) {
		Todo toUpdate = todoRepository.findById(todoId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid todoId"));

		toUpdate.update(updatedTodo);

		todoRepository.save(toUpdate);

		return todoRepository.findById(todoId)
				.orElseThrow(() -> new IllegalArgumentException(String.format("Todo %s is no longer in the database", todoId)));
	}

	private String todoDeletedResponse(String todoId, boolean deleted) {
		Map<String, String> map = new HashMap<>();

		map.put("todoId", todoId);
		map.put("deleted", Boolean.toString(deleted));

		return new Gson().toJson(map);
	}
}
