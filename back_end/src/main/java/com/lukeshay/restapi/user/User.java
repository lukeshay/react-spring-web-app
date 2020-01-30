package com.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User { // extends Auditable<String> {

  @Column(name = "id", unique = true, updatable = false)
  @Expose
  @GeneratedValue(generator = "pg-uuid")
  @GenericGenerator(name = "pg-uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @Id
  private String id;

  @Column(name = "password")
  @JsonProperty(access = Access.WRITE_ONLY)
  private String password;

  @Column(name = "username", unique = true)
  @Expose
  private String username;

  @Column(name = "email", unique = true)
  @Expose
  private String email;

  @Column(name = "first_name")
  @Expose
  private String firstName;

  @Column(name = "last_name")
  @Expose
  private String lastName;

  @Column(name = "phone_number")
  @Expose
  private String phoneNumber;

  @Column(name = "city")
  @Expose
  private String city;

  @Column(name = "state")
  @Expose
  private String state;

  @Column(name = "country")
  @Expose
  private String country;

  @Column(name = "authoritie")
  @Expose
  private String authority;

  @Column(name = "role")
  @Expose
  private String role;

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
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.state = state;
    this.country = country;
    this.password = password;
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof User && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
