package io.lukeshay.restapi.todo;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@SpringBootTest
@AutoConfigureDataMongo
class ToDoServiceTest {

	@Autowired
	ToDoService toDoService;

	@Autowired
	ToDoRepository toDoRepository;

	@AfterEach
	void tearDown() {
		toDoService.deleteAllTodos();
	}

	@Test
	void addToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveTodo(addedToDo);
		ToDo getToDo = toDoService.getTodo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo);
	}

	@Test
	void getAllToDosTest() {
		List<ToDo> listOfToDos = new ArrayList<>();

		for (int i = 0; i < 10; i++) {
			ToDo addedToDo = new ToDo(Integer.toString(i), "text" + i, i % 2 == 0);
			toDoService.saveTodo(addedToDo);
			listOfToDos.add(addedToDo);
		}

		List<ToDo> getTodos = toDoService.getAllTodos();

		listOfToDos.forEach(toDo -> {
			Assertions.assertTrue(getTodos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() + " was not found in the database.");
		});
	}

	@Test
	void deleteToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveTodo(addedToDo);
		ToDo getToDo = toDoService.getTodo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo);

		toDoService.deleteTodo(addedToDo.getId());

		try {
			getToDo = toDoService.getTodo(addedToDo.getId());
			Assertions.assertNull(getToDo, getToDo.getId() + " was found in database but should not have been.");
		} catch (NoSuchElementException e) {
			Assertions.assertEquals("No value present", e.getMessage(), "Incorrect error message.");
		}
	}

	@Test
	void deleteAllToDosTest() {
		List<ToDo> listOfToDos = new ArrayList<>();

		for (int i = 0; i < 10; i++) {
			ToDo addedToDo = new ToDo(Integer.toString(i), "text" + i, i % 2 == 0);
			toDoService.saveTodo(addedToDo);
			listOfToDos.add(addedToDo);
		}

		List<ToDo> getToDos = toDoService.getAllTodos();

		listOfToDos.forEach(toDo ->
				Assertions.assertTrue(getToDos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() + " was not found in the database.")
		);

		toDoService.deleteAllTodos();

		Assertions.assertEquals(0, toDoService.getAllTodos().size(), "Not all to-dos were deleted");
	}

	@Test
	void updateToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveTodo(addedToDo);
		ToDo getToDo = toDoService.getTodo(addedToDo.getId());

		Assertions.assertEquals(addedToDo, getToDo, "ToDos do not match.");

		addedToDo.setCompleted(true);

		toDoService.updateTodo(addedToDo.getId(), addedToDo);

		getToDo = toDoService.getTodo(addedToDo.getId());
		Assertions.assertEquals(addedToDo, getToDo, "ToDo was not updated.");
	}

	@Test
	void getAllToDosFromUserTest() {
		List<ToDo> listOfToDos = new ArrayList<>();
		ToDo otherUserToDo = new ToDo("id1", "text", false);
		toDoService.saveTodo(otherUserToDo);

		for (int i = 0; i < 10; i++) {
			ToDo addedToDo = new ToDo("id2", "text" + i, i % 2 == 0);
			toDoService.saveTodo(addedToDo);
			listOfToDos.add(addedToDo);
		}

		List<ToDo> getToDos = toDoService.getAllTodosFromUser("id2");

		listOfToDos.forEach(toDo ->
				Assertions.assertTrue(getToDos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() + " was not found in the database.")
		);

	}

}
