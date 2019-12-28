package com.lukeshay.restapi.todo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todos")
@PreAuthorize("isAuthenticated()")
public class ToDoController {
  private static Logger LOG = LoggerFactory.getLogger(ToDoController.class.getName());

  private ToDoService toDoService;

  @Autowired
  public ToDoController(ToDoService toDoService) {
    this.toDoService = toDoService;
  }

  @GetMapping("/{userId}/all")
  public ResponseEntity<?> getAllToDos(@PathVariable String userId) {
    LOG.debug("Getting user {} to-do's.", userId);

    List<ToDo> toDos = toDoService.getAllToDos(userId);

    return Responses.okJsonResponse(toDos);
  }

  @PostMapping("")
  public ResponseEntity<?> addToDo(@RequestBody ToDo newToDo) {
    LOG.debug("Adding to-do: {}", newToDo.toString());

    ToDo toDo = toDoService.addToDo(newToDo);

    return Responses.okJsonResponse(toDo);
  }

  @GetMapping("/{toDoId}")
  public ResponseEntity<?> getToDo(@PathVariable String toDoId) {
    LOG.debug("Getting to-do: {}", toDoId);

    ToDo toDo = toDoService.getToDo(toDoId);

    if (toDo == null) {
      return Responses.notFoundJsonResponse(Bodys.error("To-do not found."));
    } else {
      return Responses.okJsonResponse(toDo);
    }
  }

  @DeleteMapping("/{toDoId}")
  public ResponseEntity<?> deleteToDo(@PathVariable String toDoId) {
    LOG.debug("Deleting to-do: {}", toDoId);

    ToDo deletedToDo = toDoService.deleteToDo(toDoId);

    if (deletedToDo == null) {
      return Responses.notFoundJsonResponse(Bodys.error("To-do was not found."));
    } else {
      return Responses.okJsonResponse(deletedToDo);
    }
  }

  @PutMapping("/{toDoId}")
  public ResponseEntity<?> updateToDo(
      @PathVariable String toDoId,
      @JsonProperty("text") String text,
      @JsonProperty("completed") Boolean completed,
      @JsonProperty("dueDate") String dueDate) {
    LOG.debug("Updating to-do {}", toDoId);

    ToDo updatedToDo = toDoService.updateToDo(toDoId, text, completed, dueDate);

    if (updatedToDo == null) {
      return Responses.notFoundJsonResponse(Bodys.error("To-do not found."));
    } else {
      return Responses.okJsonResponse(updatedToDo);
    }
  }
}
