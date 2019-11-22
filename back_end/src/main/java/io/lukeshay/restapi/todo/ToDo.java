package io.lukeshay.restapi.todo;

import com.google.gson.Gson;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * The type Todo.
 */
@Getter
@Setter
@NoArgsConstructor
public class ToDo {
	@Id
	private String id;
	private String createdDate;
	private String modifiedDate;
	private String userId;
	private String text;
	private boolean completed;
	private String dueDate;

	/**
	 * Instantiates a new Todo.
	 *
	 * @param userId    the user id
	 * @param text      the text
	 * @param completed the completed
	 */
	public ToDo(String userId, String text, boolean completed) {
		this.userId = userId;
		this.text = text;
		this.completed = completed;
		this.createdDate = new Date().toString();
		this.modifiedDate = new Date().toString();
		this.dueDate = "";
	}

	/**
	 * Instantiates a new Todo.
	 *
	 * @param userId    the user id
	 * @param text      the text
	 * @param completed the completed
	 * @param dueDate   the due date
	 */
	public ToDo(String userId, String text, boolean completed, String dueDate) {
		this.userId = userId;
		this.text = text;
		this.completed = completed;
		this.createdDate = new Date().toString();
		this.modifiedDate = new Date().toString();
		this.dueDate = dueDate;
	}

	/**
	 * Update.
	 *
	 * @param updatedToDo the updated todo
	 */
	public void update(ToDo updatedToDo) {
		if (!id.equals(updatedToDo.id)) return;
		if (updatedToDo.text != null) this.text = updatedToDo.text;
		this.completed = updatedToDo.completed;
		this.modifiedDate = new Date().toString();
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

	@Override
	public boolean equals(Object obj) {
		if (!obj.getClass().equals(this.getClass())) {
			return false;
		}
		else {
			ToDo toDo = (ToDo) obj;
			return id.equals(toDo.id)
					&& createdDate.equals(toDo.createdDate)
					&& modifiedDate.equals(toDo.modifiedDate)
					&& userId.equals(toDo.userId)
					&& text.equals(toDo.text)
					&& completed == toDo.completed;
		}
	}
}
