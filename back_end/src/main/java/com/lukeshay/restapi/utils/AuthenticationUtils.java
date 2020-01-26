package com.lukeshay.restapi.utils;

import com.lukeshay.restapi.security.UserPrincipal;
import com.lukeshay.restapi.user.User;
import org.springframework.security.core.Authentication;

public class AuthenticationUtils {
  public static User getUser(Authentication authentication) {
    return ((UserPrincipal) authentication.getPrincipal()).getUser();
  }
}
