package com.lukeshay.restapi.security;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.session.Session;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.Models;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthBody {
  @Expose private User user;
  @Expose private Session session;

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
