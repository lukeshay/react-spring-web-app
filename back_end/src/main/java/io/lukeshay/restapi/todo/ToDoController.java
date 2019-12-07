package io.lukeshay.restapi.todo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type To-do controller.
 */
@RestController
@RequestMapping("/todo")
public class ToDoController {

  private ToDoService toDoService;

  /**
   * Instantiates a new To-do controller.
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
  public List<ToDo> getAllToDos(@PathVariable String userId) {
    return toDoService.getAllToDosFromUser(userId);
  }

  @GetMapping("/all")
  public List<ToDo> getEverybodiesToDos() {
    return toDoService.getAllToDos();
  }

  /**
   * Add to-do to-do.
   *
   * @param newToDo the new to-do
   * @return the to-do
   */
  @PostMapping("")
  public ToDo addToDo(@RequestBody ToDo newToDo) {
    return toDoService.saveToDo(newToDo);
  }

  /**
   * Delete to-do string.
   *
   * @param toDoId the to-do id
   * @return the string
   */
  @PostMapping("/{toDoId}")
  public ToDo getToDo(@PathVariable String toDoId) {
    return toDoService.getToDo(toDoId);
  }

  /**
   * Delete to-do string.
   *
   * @param toDoId the to-do id
   * @return the string
   */
  @DeleteMapping("/{toDoId}")
  public ToDo deleteToDo(@PathVariable String toDoId) {
    return toDoService.deleteToDo(toDoId);
  }

  /**
   * Update to-do to-do.
   *
   * @param toDoId      the to-do id
   * @param updatedToDo the updated to-do
   * @return the to-do
   */
  @PutMapping("/{toDoId}")
  public ToDo updateToDo(@PathVariable String toDoId, @RequestBody ToDo updatedToDo) {
    return toDoService.updateToDo(toDoId, updatedToDo);
  }
}
