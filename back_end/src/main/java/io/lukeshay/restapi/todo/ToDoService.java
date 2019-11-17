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
public class ToDoService {
	private static Logger logger = Logger.getLogger(ToDoService.class.getName());
	private ToDoRepository todoRepository;

	/**
	 * Instantiates a new Todo service.
	 *
	 * @param todoRepository the todo repository
	 */
	@Autowired
	public ToDoService(ToDoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	/**
	 * Gets all todos from user.
	 *
	 * @param userId the user id
	 * @return the all todos from user
	 */
	public List<ToDo> getAllTodosFromUser(String userId) {
		logger.info(String.format("Getting user %s todos.", userId));
		return todoRepository.findAllByUserId(userId);
	}

	/**
	 * Save todo todo.
	 *
	 * @param newToDo the new todo
	 * @return the todo
	 */
	public ToDo saveTodo(ToDo newToDo) {
		logger.info(String.format("Saving todo text: %s", newToDo.getText()));
		if (newToDo.getId() != null) {
			throw new IllegalArgumentException("Todo should not have an id.");
		}

		todoRepository.save(newToDo);
		return todoRepository.findById(newToDo.getId()).orElseThrow(() -> new IllegalArgumentException("Todo was not saved"));
	}

	/**
	 * Delete todo string.
	 *
	 * @param todoId the todo id
	 * @return the string
	 */
	public ToDo deleteTodo(String todoId) {
		logger.info(String.format("Deleting todo id: %s", todoId));
		ToDo deletedToDo = todoRepository.findById(todoId).get();
		todoRepository.deleteById(todoId);
		return deletedToDo;
	}

	/**
	 * Update todo todo.
	 *
	 * @param todoId      the todo id
	 * @param updatedToDo the updated todo
	 * @return the todo
	 */
	public ToDo updateTodo(String todoId, ToDo updatedToDo) {
		logger.info(String.format("Updating todo id: %s", todoId));
		ToDo toUpdate = todoRepository.findById(todoId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid todoId"));

		toUpdate.update(updatedToDo);

		todoRepository.save(toUpdate);

		return todoRepository.findById(todoId)
				.orElseThrow(() -> new IllegalArgumentException(String.format("Todo %s is no longer in the database", todoId)));
	}

	public String deleteAllTodos() {
		logger.warning("DELETING ALL TODOS");
		todoRepository.findAll().forEach(toDo -> todoRepository.delete(toDo));

		return todoDeletedResponse("all", todoRepository.findAll().size() == 0);
	}

	private static String todoDeletedResponse(String todoId, boolean deleted) {
		Map<String, String> map = new HashMap<>();

		map.put("todoId", todoId);
		map.put("deleted", Boolean.toString(deleted));

		return new Gson().toJson(map);
	}

	public List<ToDo> getAllTodos() {
		return todoRepository.findAll();
	}
}
