package io.lukeshay.restapi.todo;

import io.lukeshay.restapi.utils.Exceptions;
import java.util.List;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  /**
   * Gets all todos from user.
   *
   * @param userId the user id
   * @return the all todos from user
   */
  public List<ToDo> getAllToDosFromUser(String userId) {
    logger.info(String.format("Getting user %s to-dos.", userId));
    return toDoRepository.findAllByUserId(userId);
  }

  /**
   * Save to-do newToDo.
   *
   * @param newToDo the new to-do
   * @return the to-do
   */
  public ToDo saveToDo(ToDo newToDo) {
    logger.info(String.format("Saving to-do text: %s", newToDo.getText()));
    if (newToDo.getId() != null) {
      throw Exceptions.badRequest("Todo should not have an id.");
    }

    toDoRepository.save(newToDo);
    return toDoRepository.findById(newToDo.getId())
        .orElseThrow(() -> Exceptions
            .notFound(String.format("Could not find todo after save id: %s", newToDo.getId())));
  }

  /**
   * Delete to-do toDoId.
   *
   * @param toDoId the to-do id
   * @return the string
   */
  public ToDo deleteToDo(String toDoId) {
    logger.info(String.format("Deleting to-do id: %s", toDoId));
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
  public ToDo updateToDo(String toDoId, ToDo updatedToDo) {
    logger.info(String.format("Updating to-do id: %s", toDoId));
    ToDo toUpdate = toDoRepository.findById(toDoId)
        .orElseThrow(
            () -> Exceptions.notFound(String.format("Could not find todo id: %s", toDoId)));

    toUpdate.update(updatedToDo);

    toDoRepository.save(toUpdate);

    return toDoRepository.findById(toDoId)
        .orElseThrow(() -> Exceptions
            .notFound(String.format("Could not find todo after save id: %s", toDoId)));
  }

  public List<ToDo> getAllToDos() {
    logger.info("Getting all to-dos.");
    return toDoRepository.findAll();
  }

  public ToDo getToDo(String toDoId) {
    return toDoRepository.findById(toDoId)
        .orElseThrow(
            () -> Exceptions.notFound(String.format("Could not find todo id: %s", toDoId)));
  }
}
