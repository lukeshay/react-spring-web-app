package com.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.ModelUtils;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "users")
public class User extends Auditable<String> {

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

  public User() {}

  public User(
      String username,
      String firstName,
      String lastName,
      String email,
      String phoneNumber,
      String city,
      String state,
      String country,
      String password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.state = state;
    this.country = country;
    this.password = password;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getAuthority() {
    return authority;
  }

  public void setAuthority(String authority) {
    this.authority = authority;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  @Override
  public boolean equals(Object obj) {
    return ModelUtils.equals(this, obj);
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }
}
