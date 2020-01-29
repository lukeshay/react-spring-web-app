package com.lukeshay.restapi.utils;

import com.lukeshay.restapi.security.UserPrincipal;
import com.lukeshay.restapi.user.User;
import org.springframework.security.core.Authentication;

public class AuthenticationUtils {
  public static User getUser(Authentication authentication) {
    if (authentication == null) return null;
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    return userPrincipal == null ? null : userPrincipal.getUser();
  }
}
