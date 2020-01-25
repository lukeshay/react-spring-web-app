package com.lukeshay.restapi.services;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.lukeshay.restapi.config.security.SecurityProperties;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserRepository;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Requests {

  private UserRepository userRepository;

  @Autowired
  public Requests(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUserFromRequest(HttpServletRequest request) {

    String authHeader = request.getHeader(SecurityProperties.HEADER_STRING);

    if (authHeader == null || authHeader.equals("")) {
      return null;
    }

    String token = authHeader.replace(SecurityProperties.TOKEN_PREFIX, "");

    String id;

    try {
      id =
          JWT.require(HMAC512(SecurityProperties.SECRET.getBytes()))
              .build()
              .verify(token)
              .getSubject();
    } catch (SignatureVerificationException | TokenExpiredException ignored) {
      id = null;
    }

    if (id != null) {
      return userRepository.findById(id).orElse(null);
    } else {
      return null;
    }
  }
}
