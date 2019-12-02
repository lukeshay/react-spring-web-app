package io.lukeshay.restapi.todo;

import com.google.gson.Gson;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;

/**
 * The type Todo.
 */
@Getter
@Setter
@NoArgsConstructor
public class ToDo implements Persistable<String> {
	@Id
	private String id;

	@CreatedDate
	private String createdDate;

	@LastModifiedDate
	private String modifiedDate;

	private String userId;
	private String text;
	private boolean completed;
	private String dueDate;
	private boolean persistable;

	/**
	 * Instantiates a new To-do.
	 *
	 * @param userId    the user id
	 * @param text      the text
	 * @param completed the completed
	 */
	public ToDo(String userId, String text, boolean completed) {
		this.userId = userId;
		this.text = text;
		this.completed = completed;
		this.dueDate = "";
	}

	/**
	 * Update.
	 *
	 * @param updatedToDo the updated to-do
	 */
	void update(ToDo updatedToDo) {
		if (!id.equals(updatedToDo.id)) return;
		if (updatedToDo.text != null) this.text = updatedToDo.text;
		this.completed = updatedToDo.completed;
		this.persistable = true;
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
					&& completed == toDo.completed
          && dueDate.equals(toDo.dueDate);
		}
	}

	/**
	 * Returns if the {@code Persistable} is new or was persisted already.
	 *
	 * @return if {@literal true} the object is new.
	 */
	@Override
	public boolean isNew() {
		return !persistable;
	}
}
