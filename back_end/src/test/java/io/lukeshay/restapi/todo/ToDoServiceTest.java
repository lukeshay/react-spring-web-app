package io.lukeshay.restapi.todo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureDataMongo
class ToDoServiceTest {

	@Autowired
	ToDoService toDoService;

	@Autowired
	ToDoRepository toDoRepository;

	@Test
	void addToDoTest() {
		ToDo addedToDo = new ToDo("id", "text", false);
		toDoService.saveTodo(addedToDo);
		ToDo getToDo = toDoService.getTodo(addedToDo.getId());

		Assertions.assertAll(
				() -> Assertions.assertEquals(addedToDo.getText(), getToDo.getText(), "The text does not match."),
				() -> Assertions.assertEquals(addedToDo.getUserId(), getToDo.getUserId(), "The user id does not match."),
				() -> Assertions.assertFalse(getToDo.isCompleted(), "Marked as completed but should not be"));
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
			Assertions.assertTrue(getTodos.stream().anyMatch(e -> e.equals(toDo)), toDo.getId() +  " was not found in the database.");
		});
	}
}
