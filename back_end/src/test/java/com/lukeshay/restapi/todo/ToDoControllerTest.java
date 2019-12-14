package com.lukeshay.restapi.todo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureDataMongo
class ToDoControllerTest {
	@Autowired
	ToDoController toDoController;

	@Test
	void addToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false, "Due date");
		toDoController.addToDo(addedToDo);
		ToDo getToDo = toDoController.getToDo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo);
	}

	@Test
	void getAllToDosFromUserTest() {
		List<ToDo> listOfToDos = new ArrayList<>();
		ToDo otherUserToDo = new ToDo("id1", "text", false, "Due date");
		toDoController.addToDo(otherUserToDo);

		for (int i = 0; i < 10; i++) {
			ToDo addedToDo = new ToDo("id2", "text" + i, i % 2 == 0);
			toDoController.addToDo(addedToDo);
			listOfToDos.add(addedToDo);
		}

		List<ToDo> getToDos = toDoController.getAllToDos("id2");

		listOfToDos.forEach(toDo ->
				Assertions.assertTrue(getToDos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() + " was not found in the database.")
		);

	}

	@Test
	void updateToDoTest() {
		ToDo addedToDo = new ToDo("id2", "text", false);
		toDoController.addToDo(addedToDo);
		ToDo getToDo = toDoController.getToDo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo, "ToDos do not match.");

		addedToDo.setCompleted(true);

		toDoController.updateToDo(addedToDo.getId(), addedToDo);

		getToDo = toDoController.getToDo(addedToDo.getId());
		Assertions.assertEquals(addedToDo, getToDo, "ToDo was not updated.");
	}

	@Test
	void deleteToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoController.addToDo(addedToDo);
		ToDo getToDo = toDoController.getToDo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo);

		toDoController.deleteToDo(addedToDo.getId());

		try {
			getToDo = toDoController.getToDo(addedToDo.getId());
			Assertions.assertNull(getToDo, getToDo.getId() + " was found in database but should not have been.");
		} catch (ResponseStatusException e) {
			Assertions.assertEquals(
					String.format("404 NOT_FOUND \"Could not find todo id: %s\"", addedToDo.getId()), e.getMessage(), "Incorrect error message.");
		}
	}
}
