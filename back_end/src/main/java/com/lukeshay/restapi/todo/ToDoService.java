package com.lukeshay.restapi.todo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class ToDoService {
  private ToDoRepository toDoRepository;

  /**
   * Instantiates a new To-do controller.
   *
   * @param toDoRepository the to-do repository
   */
  @Autowired
  ToDoService(ToDoRepository toDoRepository) {
    this.toDoRepository = toDoRepository;
  }

  List<ToDo> getAllToDos(String userId) {
    return toDoRepository.findAllByUserId(userId);
  }

  ToDo addToDo(ToDo newToDo) {
    return toDoRepository.save(newToDo);
  }

  ToDo getToDo(String toDoId) {
    return toDoRepository.findById(toDoId).orElse(null);
  }

  ToDo deleteToDo(String toDoId) {
    ToDo deletedToDo = toDoRepository.findById(toDoId).orElse(null);

    toDoRepository.deleteById(toDoId);
    return deletedToDo;
  }

  ToDo updateToDo(String toDoId, String text, Boolean completed, String dueDate) {
    ToDo toUpdate = toDoRepository.findById(toDoId).orElse(null);

    if (toUpdate == null) {
      return null;
    }

    if (text != null && !text.equals("")) {
      toUpdate.setText(text);
    }

    if (completed != null) {
      toUpdate.setCompleted(completed);
    }

    if (dueDate != null && !dueDate.equals("")) {
      toUpdate.setDueDate(dueDate);
    }

    toUpdate.setPersistable(true);

    return toDoRepository.save(toUpdate);
  }
}
