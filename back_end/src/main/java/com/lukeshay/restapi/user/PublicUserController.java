package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.Exceptions;
import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/users")
public class PublicUserController {

  private static Logger LOG = LoggerFactory.getLogger(PublicUserController.class.getName());

  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  @Autowired
  public PublicUserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("")
  public User createUser(@RequestBody User user) {
    if (user.getUsername() != null && user.getFirstName() != null && user.getLastName() != null
        && user.getEmail() != null && user.getPhoneNumber() != null && user.getState() != null
        && user.getCountry() != null && user.getPassword() != null) {

      LOG.debug("Creating new user: {}", user.getUsername());

      if (userRepository.findByEmail(user.getEmail()).orElse(null) != null) {
        throw Exceptions.badRequest("Email is taken.");
      } else if (userRepository.findByUsername(user.getUsername()).orElse(null) != null) {
        throw Exceptions.badRequest("Username is taken.");
      }

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setAuthorities(Collections.singletonList(UserTypes.BASIC.authority()));
      user.setAuthorities(Collections.singletonList(UserTypes.BASIC.role()));
      userRepository.save(user);

      return userRepository.findByUsername(user.getUsername()).orElseThrow(() -> Exceptions
          .internalServerError(String.format("%s was not saved.", user.getUsername())));

    } else {
      LOG.warn("Error creating new user: {}", user.toString());

      throw Exceptions.badRequest("Missing a field.");
    }

  }
}
