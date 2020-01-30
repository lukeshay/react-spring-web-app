package com.lukeshay.restapi.security;

public class Credentials {
  private String username;
  private String password;
  private Boolean remember;

  public Credentials() {}

  public Credentials(String username, String password, Boolean remember) {
    this.username = username;
    this.password = password;
    this.remember = remember;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Boolean getRemember() {
    return remember;
  }

  public void setRemember(Boolean remember) {
    this.remember = remember;
  }
}
