package com.lukeshay.restapi.todo;

import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(value = "To-do api endpoints.")
public class ToDoController {
  private static Logger LOG = LoggerFactory.getLogger(ToDoController.class.getName());

  private ToDoService toDoService;

  @Autowired
  public ToDoController(ToDoService toDoService) {
    this.toDoService = toDoService;
  }

  @GetMapping("/{userId}/all")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Gets all to-dos.", response = List.class)
  public ResponseEntity<?> getAllToDos(@PathVariable String userId) {
    LOG.debug("Getting user {} to-do's.", userId);

    List<ToDo> toDos = toDoService.getAllToDos(userId);

    return Responses.okJsonResponse(toDos);
  }

  @PostMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Adds a to-do.", response = ToDo.class)
  public ResponseEntity<?> addToDo(@RequestBody ToDo newToDo) {
    LOG.debug("Adding to-do: {}", newToDo.toString());

    ToDo toDo = toDoService.addToDo(newToDo);

    return Responses.okJsonResponse(toDo);
  }

  @GetMapping("/{toDoId}")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Gets a to-do.", response = ToDo.class)
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
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Deletes a to-do.", response = ToDo.class)
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
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Updates a to-do.", response = ToDo.class)
  public ResponseEntity<?> updateToDo(@PathVariable String toDoId, @RequestBody ToDo toDo) {
    LOG.debug("Updating to-do {}", toDoId);

    ToDo updatedToDo =
        toDoService.updateToDo(toDoId, toDo.getText(), toDo.isCompleted(), toDo.getDueDate());

    if (updatedToDo == null) {
      return Responses.notFoundJsonResponse(Bodys.error("To-do not found."));
    } else {
      return Responses.okJsonResponse(updatedToDo);
    }
  }
}
