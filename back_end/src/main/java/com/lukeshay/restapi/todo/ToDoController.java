package com.lukeshay.restapi.todo;

import com.lukeshay.restapi.utils.Exceptions;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("/todos")
public class ToDoController {
  private static Logger LOG = LoggerFactory.getLogger(ToDoController.class.getName());

  private ToDoRepository toDoRepository;

  /**
   * Instantiates a new To-do controller.
   *
   * @param toDoRepository the to-do repository
   */
  @Autowired
  public ToDoController(ToDoRepository toDoRepository) {
    this.toDoRepository = toDoRepository;
  }

  /**
   * Gets all to-dos.
   *
   * @param userId the user id
   * @return the all to-dos
   */
  @GetMapping("/{userId}")
  public List<ToDo> getAllToDos(@PathVariable String userId) {
    LOG.debug("Getting user {} to-do's.", userId);

    return toDoRepository.findAllByUserId(userId);
  }

  @GetMapping("/all")
  public List<ToDo> getEveryonesToDos() {
    LOG.debug("Getting all to-dos");

    return toDoRepository.findAll();
  }

  /**
   * Add to-do to-do.
   *
   * @param newToDo the new to-do
   * @return the to-do
   */
  @PostMapping("")
  public ToDo addToDo(@RequestBody ToDo newToDo) {
    LOG.debug("Adding to-do: {}", newToDo.toString());

    if (newToDo.getId() != null) {
      throw Exceptions.badRequest("Todo should not have an id.");
    }

    toDoRepository.save(newToDo);
    return toDoRepository.findById(newToDo.getId())
        .orElseThrow(() -> Exceptions
            .notFound(String.format("Could not find todo after save id: %s", newToDo.getId())));
  }

  /**
   * Delete to-do string.
   *
   * @param toDoId the to-do id
   * @return the string
   */
  @PostMapping("/{toDoId}")
  public ToDo getToDo(@PathVariable String toDoId) {
    LOG.debug("Getting to-do: {}", toDoId);

    return toDoRepository.findById(toDoId)
        .orElseThrow(
            () -> Exceptions.notFound(String.format("Could not find todo id: %s", toDoId)));
  }

  /**
   * Delete to-do string.
   *
   * @param toDoId the to-do id
   * @return the string
   */
  @DeleteMapping("/{toDoId}")
  public ToDo deleteToDo(@PathVariable String toDoId) {
    LOG.debug("Deleting to-do: {}", toDoId);

    ToDo deletedToDo = toDoRepository.findById(toDoId)
        .orElseThrow(
            () -> Exceptions.notFound(String.format("Could not find todo id: %s", toDoId)));

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
  @PutMapping("/{toDoId}")
  public ToDo updateToDo(@PathVariable String toDoId, @RequestBody ToDo updatedToDo) {
    LOG.debug("Updating to-do {} to: {}", toDoId, updatedToDo.toString());

    ToDo toUpdate = toDoRepository.findById(toDoId)
        .orElseThrow(
            () -> Exceptions.notFound(String.format("Could not find todo id: %s", toDoId)));

    toUpdate.update(updatedToDo);

    toDoRepository.save(toUpdate);

    return toDoRepository.findById(toDoId)
        .orElseThrow(() -> Exceptions
            .notFound(String.format("Could not find todo after save id: %s", toDoId)));
  }
}
