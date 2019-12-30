package com.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/** The type User. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User implements Persistable<String> {

  @Id @Expose private String userId;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String createdDate;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String modifiedDate;

  @JsonProperty(access = Access.WRITE_ONLY)
  private String password;

  @JsonProperty(access = Access.WRITE_ONLY)
  private boolean persistable;

  @Indexed(unique = true)
  @Expose
  private String username;

  @Indexed(unique = true)
  @Expose
  private String email;

  @Expose private String firstName;
  @Expose private String lastName;
  @Expose private String phoneNumber;
  @Expose private String city;
  @Expose private String state;
  @Expose private String country;
  @Expose private List<String> authorities;
  @Expose private List<String> roles;

  public User(
      String username,
      String firstName,
      String lastName,
      String email,
      String phoneNumber,
      String state,
      String country,
      String password) {
    this.username = username;
    this.firstName = firstName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.state = state;
    this.country = country;
    this.password = password;
  }

  @Override
  public String getId() {
    return userId;
  }

  @Override
  public boolean isNew() {
    return !persistable;
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof User && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }
}
