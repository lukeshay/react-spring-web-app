package io.lukeshay.restapi.todo;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * The type To-do service.
 */
@Service
public class ToDoService {
	private static Logger logger = Logger.getLogger(ToDoService.class.getName());
	private ToDoRepository toDoRepository;

	/**
	 * Instantiates a new To-do service.
	 *
	 * @param toDoRepository the to-do repository
	 */
	@Autowired
	public ToDoService(ToDoRepository toDoRepository) {
		this.toDoRepository = toDoRepository;
	}

	private static String toDoDeletedResponse(String toDoId, boolean deleted) {
		Map<String, String> map = new HashMap<>();

		map.put("toDoId", toDoId);
		map.put("deleted", Boolean.toString(deleted));

		return new Gson().toJson(map);
	}

	/**
	 * Gets all todos from user.
	 *
	 * @param userId the user id
	 * @return the all todos from user
	 */
	public List<ToDo> getAllToDosFromUser(String userId) {
		logger.info(String.format("Getting user %s todos.", userId));
		return toDoRepository.findAllByUserId(userId);
	}

	/**
	 * Save to-do newToDo.
	 *
	 * @param newToDo the new to-do
	 * @return the to-do
	 */
	public ToDo saveToDo(ToDo newToDo) {
		logger.info(String.format("Saving todo text: %s", newToDo.getText()));
		if (newToDo.getId() != null) {
			throw new IllegalArgumentException("Todo should not have an id.");
		}

		toDoRepository.save(newToDo);
		return toDoRepository.findById(newToDo.getId())
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						String.format("Could not find todo after save id: %s", newToDo.getId())
				));
	}

	/**
	 * Delete to-do toDoId.
	 *
	 * @param toDoId the to-do id
	 * @return the string
	 */
	public ToDo deleteToDo(String toDoId) {
		logger.info(String.format("Deleting todo id: %s", toDoId));
		ToDo deletedToDo = toDoRepository.findById(toDoId)
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						String.format("Could not find todo id: %s", toDoId)
				));

		toDoRepository.deleteById(toDoId);
		return deletedToDo;
	}

	/**
	 * Update to-do to-do.
	 *
	 * @param toDoId      the to-do id
	 * @param updatedToDo the updated to-do
	 * @return the to-do
	 */
	public ToDo updateToDo(String toDoId, ToDo updatedToDo) {
		logger.info(String.format("Updating todo id: %s", toDoId));
		ToDo toUpdate = toDoRepository.findById(toDoId)
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						String.format("Could not find todo id: %s", toDoId)
				));

		toUpdate.update(updatedToDo);

		toDoRepository.save(toUpdate);

		return toDoRepository.findById(toDoId)
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						String.format("Could not find todo after save id: %s", toDoId)
				));
	}

	public String deleteAllToDos() {
		logger.warning("DELETING ALL TODOS");
		toDoRepository.findAll().forEach(toDo -> toDoRepository.delete(toDo));

		return toDoDeletedResponse("all", toDoRepository.findAll().size() == 0);
	}

	public List<ToDo> getAllToDos() {
		return toDoRepository.findAll();
	}

	public ToDo getToDo(String toDoId) {
		return toDoRepository.findById(toDoId)
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						String.format("Could not find todo id: %s", toDoId)
				));
	}
}
