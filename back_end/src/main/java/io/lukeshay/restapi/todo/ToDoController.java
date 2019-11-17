package io.lukeshay.restapi.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Todo controller.
 */
@RestController
@RequestMapping("/todo")
public class ToDoController {
	private ToDoService toDoService;

	/**
	 * Instantiates a new Todo controller.
	 *
	 * @param toDoService the to-do service
	 */
	@Autowired
	public ToDoController(ToDoService toDoService) {
		this.toDoService = toDoService;
	}

	/**
	 * Gets all to-dos.
	 *
	 * @param userId the user id
	 * @return the all to-dos
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{userId}")
	public List<ToDo> getAllTodos(@PathVariable  String userId) {
		return toDoService.getAllTodosFromUser(userId);
	}

	/**
	 * Add to-do to-do.
	 *
	 * @param newToDo the new to-do
	 * @return the to-do
	 */
	@RequestMapping(method = RequestMethod.POST, value = "")
	public ToDo addTodo(@RequestBody ToDo newToDo) {
		return toDoService.saveTodo(newToDo);
	}

	/**
	 * Delete to-do string.
	 *
	 * @param toDoId the to-do id
	 * @return the string
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{toDoId}")
	public ToDo deleteTodo(@PathVariable String toDoId) {
		return toDoService.deleteTodo(toDoId);
	}

	/**
	 * Delete all to-dos.
	 *
	 * @return the string
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/all")
	public String deleteAllTodos() {
		return toDoService.deleteAllTodos();
	}

	/**
	 * Delete all to-dos.
	 *
	 * @return the string
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/all")
	public List<ToDo> getAllTodos() {
		return toDoService.getAllTodos();
	}

	/**
	 * Update to-do to-do.
	 *
	 * @param toDoId      the to-do id
	 * @param updatedToDo the updated to-do
	 * @return the to-do
	 */
	@RequestMapping(method = RequestMethod.PUT, value = "/{toDoId}")
	public ToDo updateTodo(@PathVariable String toDoId, @RequestBody ToDo updatedToDo) {
		return toDoService.updateTodo(toDoId, updatedToDo);
	}

}
