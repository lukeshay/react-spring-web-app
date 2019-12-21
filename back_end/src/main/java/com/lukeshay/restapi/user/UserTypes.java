package com.lukeshay.restapi.user;

public enum UserTypes {
  BASIC,
  ADMIN;

  public String role() {
    return this.toString() + "_ROLE";
  }

  public boolean equals(String role) {
    return this.role().equals(role);
  }

  public String authority() {
    return this.toString();
  }
}
