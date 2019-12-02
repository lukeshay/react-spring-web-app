package io.lukeshay.restapi.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Todo controller.
 */
@RestController
@CrossOrigin(origins = "http://lukeshay.com")
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
	@GetMapping("/{userId}")
	public List<ToDo> getAllTodos(@PathVariable  String userId) {
		return toDoService.getAllToDosFromUser(userId);
	}

	/**
	 * Add to-do to-do.
	 *
	 * @param newToDo the new to-do
	 * @return the to-do
	 */
  @PostMapping("")
	public ToDo addTodo(@RequestBody ToDo newToDo) {
		return toDoService.saveToDo(newToDo);
	}

	/**
	 * Delete to-do string.
	 *
	 * @param toDoId the to-do id
	 * @return the string
	 */
	@PostMapping("/{toDoId}")
	public ToDo getTodo(@PathVariable String toDoId) {
		return toDoService.getTodo(toDoId);
	}

	/**
	 * Delete to-do string.
	 *
	 * @param toDoId the to-do id
	 * @return the string
	 */
	@DeleteMapping("/{toDoId}")
	public ToDo deleteTodo(@PathVariable String toDoId) {
		return toDoService.deleteToDo(toDoId);
	}

	/**
	 * Delete all to-dos.
	 *
	 * @return the string
	 */
	@DeleteMapping("/all")
	public String deleteAllTodos() {
		return toDoService.deleteAllToDos();
	}

	/**
	 * Delete all to-dos.
	 *
	 * @return the string
	 */
	@GetMapping("/all")
	public List<ToDo> getAllTodos() {
		return toDoService.getAllToDos();
	}

	/**
	 * Update to-do to-do.
	 *
	 * @param toDoId      the to-do id
	 * @param updatedToDo the updated to-do
	 * @return the to-do
	 */
	@PutMapping("/{toDoId}")
	public ToDo updateTodo(@PathVariable String toDoId, @RequestBody ToDo updatedToDo) {
		return toDoService.updateToDo(toDoId, updatedToDo);
	}

	@ExceptionHandler(RuntimeException.class)
	public final ResponseEntity<Exception> handleAllExceptions(RuntimeException ex) {
		return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
