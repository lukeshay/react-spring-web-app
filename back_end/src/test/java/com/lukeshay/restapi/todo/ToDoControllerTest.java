package com.lukeshay.restapi.todo;

import com.lukeshay.restapi.utils.Bodys;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
@AutoConfigureDataMongo
class ToDoControllerTest {

  @Autowired private ToDoController toDoController;

  @Autowired private ToDoRepository toDoRepository;

  @Test
  void addToDoTest() {
    ToDo addedToDo = new ToDo("id", "text", false, "Due date");
    toDoController.addToDo(addedToDo);
    ResponseEntity<?> response = toDoController.getToDo(addedToDo.getId());

    Assertions.assertAll(
        () -> Assertions.assertEquals(addedToDo, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));
  }

  @Test
  void updateToDoTest() {
    ToDo addedToDo = new ToDo("id2", "text", false);
    addedToDo = toDoRepository.save(addedToDo);
    addedToDo.setPersistable(true);

    ResponseEntity<?> response = toDoController.getToDo(addedToDo.getId());

    Assertions.assertEquals(addedToDo, response.getBody(), "ToDos do not match.");

    addedToDo.setCompleted(true);
    String id = addedToDo.getId();
    addedToDo.setId(null);

    response = toDoController.updateToDo(id, null, true, null);

    addedToDo.setId(id);

    Assertions.assertEquals(addedToDo, response.getBody(), "ToDo was not updated.");
  }

  @Test
  void deleteToDoTest() {
    ToDo addedToDo = new ToDo("id", "text", false);
    toDoController.addToDo(addedToDo);
    ResponseEntity<?> response = toDoController.getToDo(addedToDo.getId());

    Assertions.assertEquals(addedToDo, response.getBody());

    toDoController.deleteToDo(addedToDo.getId());

    ResponseEntity<?> responsePostDelete = toDoController.getToDo(addedToDo.getId());

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(Bodys.error("To-do not found."), responsePostDelete.getBody()),
        () -> Assertions.assertEquals(HttpStatus.NOT_FOUND, responsePostDelete.getStatusCode()));
  }
}
