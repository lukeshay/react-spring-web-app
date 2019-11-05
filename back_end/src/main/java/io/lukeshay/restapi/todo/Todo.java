package io.lukeshay.restapi.todo;

public class Todo {
	private String id;
	private String userId;
	private String text;
	private boolean completed;

	public Todo(String id, String userId, String text, boolean completed) {
		this.id = id;
		this.userId = userId;
		this.text = text;
		this.completed = completed;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
}
