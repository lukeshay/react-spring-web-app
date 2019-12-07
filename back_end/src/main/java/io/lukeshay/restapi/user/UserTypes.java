package io.lukeshay.restapi.user;

public enum UserAuthorities {
  BASIC, ADMIN;

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
