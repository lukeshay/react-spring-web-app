package io.lukeshay.restapi.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Todo controller.
 */
@RestController
@RequestMapping("/todo")
public class TodoController {
	private TodoService todoService;

	/**
	 * Instantiates a new Todo controller.
	 *
	 * @param todoService the todo service
	 */
	@Autowired
	public TodoController(TodoService todoService) {
		this.todoService = todoService;
	}

	/**
	 * Gets all todos.
	 *
	 * @param userId the user id
	 * @return the all todos
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/{userId}")
	public List<Todo> getAllTodos(@PathVariable  String userId) {
		return todoService.getAllTodosFromUser(userId);
	}

	/**
	 * Add todo todo.
	 *
	 * @param newTodo the new todo
	 * @return the todo
	 */
	@RequestMapping(method = RequestMethod.POST, value = "")
	public Todo addTodo(@RequestBody Todo newTodo) {
		return todoService.saveTodo(newTodo);
	}

	/**
	 * Delete todo string.
	 *
	 * @param todoId the todo id
	 * @return the string
	 */
	@RequestMapping(method = RequestMethod.DELETE, value = "/{todoId}")
	public String deleteTodo(@PathVariable String todoId) {
		return todoService.deleteTodo(todoId);
	}

	/**
	 * Update todo todo.
	 *
	 * @param todoId      the todo id
	 * @param updatedTodo the updated todo
	 * @return the todo
	 */
	@RequestMapping(method = RequestMethod.PUT, value = "/{todoId}")
	public Todo updateTodo(@PathVariable String todoId, @RequestBody Todo updatedTodo) {
		return todoService.updateTodo(todoId, updatedTodo);
	}

}
