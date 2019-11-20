package io.lukeshay.restapi.todo;

import com.sun.tools.javac.comp.Todo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

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

		System.out.println("SOUT " + toDoService.getAllTodos().toString());

		ToDo addedToDo = toDoService.getTodo();

		Assertions.assertAll(() -> Assertions.assertEquals());
	}
}
