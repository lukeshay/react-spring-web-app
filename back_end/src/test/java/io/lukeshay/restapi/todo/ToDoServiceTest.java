package io.lukeshay.restapi.todo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureDataMongo
class ToDoServiceTest {

	@Autowired
	ToDoService toDoService;

	@Test
	void addToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveToDo(addedToDo);
		ToDo getToDo = toDoService.getToDo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo);
	}

	@Test
	void getAllToDosTest() {
		List<ToDo> listOfToDos = new ArrayList<>();

		for (int i = 0; i < 10; i++) {
			ToDo addedToDo = new ToDo(Integer.toString(i), "text" + i, i % 2 == 0);
			toDoService.saveToDo(addedToDo);
			listOfToDos.add(addedToDo);
		}

		List<ToDo> getToDos = toDoService.getAllToDos();

		listOfToDos.forEach(toDo -> {
			Assertions.assertTrue(getToDos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() + " was not found in the database.");
		});
	}

	@Test
	void deleteToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveToDo(addedToDo);
		ToDo getToDo = toDoService.getToDo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo);

		toDoService.deleteToDo(addedToDo.getId());

		try {
			getToDo = toDoService.getToDo(addedToDo.getId());
			Assertions.assertNull(getToDo, getToDo.getId() + " was found in database but should not have been.");
		} catch (ResponseStatusException e) {
			Assertions.assertEquals(
					String.format("404 NOT_FOUND \"Could not find todo id: %s\"", addedToDo.getId()), e.getMessage(), "Incorrect error message.");
		}
	}

	@Test
	void updateToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveToDo(addedToDo);
		ToDo getToDo = toDoService.getToDo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo, "ToDos do not match.");

		addedToDo.setCompleted(true);

		toDoService.updateToDo(addedToDo.getId(), addedToDo);

		getToDo = toDoService.getToDo(addedToDo.getId());
		Assertions.assertEquals(addedToDo, getToDo, "ToDo was not updated.");
	}

	@Test
	void getAllToDosFromUserTest() {
		List<ToDo> listOfToDos = new ArrayList<>();
		ToDo otherUserToDo = new ToDo("id1", "text", false);
		toDoService.saveToDo(otherUserToDo);

		for (int i = 0; i < 10; i++) {
			ToDo addedToDo = new ToDo("id2", "text" + i, i % 2 == 0);
			toDoService.saveToDo(addedToDo);
			listOfToDos.add(addedToDo);
		}

		List<ToDo> getToDos = toDoService.getAllToDosFromUser("id2");

		listOfToDos.forEach(toDo ->
				Assertions.assertTrue(getToDos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() + " was not found in the database.")
		);

	}

}
