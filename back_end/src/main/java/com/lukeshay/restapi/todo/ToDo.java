package com.lukeshay.restapi.todo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

/** The type Todo. */
@Getter
@Setter
@NoArgsConstructor
@Document
public class ToDo implements Persistable<String> {

  @Id @Expose private String id;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String createdDate;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String modifiedDate;

  @JsonProperty(access = Access.WRITE_ONLY)
  private boolean persistable;

  @Expose private String userId;
  @Expose private String text;
  @Expose private boolean completed;
  @Expose private String dueDate;

  /**
   * Instantiates a new To-do.
   *
   * @param userId the user id
   * @param text the text
   * @param completed the completed
   */
  public ToDo(String userId, String text, boolean completed) {
    this.userId = userId;
    this.text = text;
    this.completed = completed;
    this.dueDate = "";
  }

  /**
   * Instantiates a new To-do.
   *
   * @param userId the user id
   * @param text the text
   * @param completed the completed
   */
  public ToDo(String userId, String text, boolean completed, String dueDate) {
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
    if (!id.equals(updatedToDo.id)) {
      return;
    }
    if (updatedToDo.text != null) {
      this.text = updatedToDo.text;
    }

    this.completed = updatedToDo.completed;
    this.persistable = true;
  }

  @Override
  public boolean isNew() {
    return !persistable;
  }

  @Override
  public boolean equals(Object obj) {
    if (!obj.getClass().equals(this.getClass())) {
      return false;
    } else {
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

  @Override
  public String toString() {
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }
}
