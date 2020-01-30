package com.lukeshay.restapi.security;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.session.Session;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.ModelUtils;

public class AuthBody {
  @Expose private User user;
  @Expose private Session session;

  public AuthBody(User user, Session session) {
    this.user = user;
    this.session = session;
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }
}
