package com.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.Gson;
import java.util.List;
import javax.validation.constraints.NotNull;
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

  @Id private String userId;

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
  private String username;

  @Indexed(unique = true)
  private String email;

  private String firstName;
  private String lastName;
  private String phoneNumber;
  private String city;
  private String state;
  private String country;
  private List<String> authorities;
  private List<String> roles;

  User(
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
    return new Gson().toJson(this);
  }

  void update(@NotNull User updatedUser) {

    persistable = true;

    if (updatedUser.getFirstName() != null) {
      firstName = updatedUser.getFirstName();
    }
    if (updatedUser.getLastName() != null) {
      lastName = updatedUser.getLastName();
    }
    if (updatedUser.getEmail() != null) {
      email = updatedUser.getEmail();
      username = updatedUser.getEmail();
    }
    if (updatedUser.getState() != null) {
      state = updatedUser.getState();
    }
    if (updatedUser.getCountry() != null) {
      country = updatedUser.getCountry();
    }
    if (updatedUser.getPhoneNumber() != null) {
      phoneNumber = updatedUser.getPhoneNumber();
    }
  }
}
