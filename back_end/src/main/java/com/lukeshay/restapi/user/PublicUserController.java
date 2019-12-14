package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.Exceptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/users")
public class PublicUserController {
  private static Logger LOG = LoggerFactory.getLogger(PublicUserController.class.getName());
  private UserService userService;

  @Autowired
  public PublicUserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("")
  public User createUser(@RequestBody User user) {
    if (user.getUsername() != null && user.getFirstName() != null && user.getLastName() != null
        && user.getEmail() != null && user.getPhoneNumber() != null && user.getState() != null
        && user.getCountry() != null && user.getPassword() != null) {
      LOG.debug("Creating new user: {}", user.getUsername());
      return userService.saveUser(user);
    } else {
      LOG.warn("Error creating new user: {}", user.getUsername());
      throw Exceptions.badRequest("Missing a field.");
    }

  }
}
