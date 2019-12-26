package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<?> createUser(@RequestBody User user) {
    LOG.debug("Creating user {}", user.toString());

    if (userService.isEmailTaken(user.getEmail())) {
      LOG.debug("Not creating user because email is taken.");

      return Responses.badRequestJsonResponse(Bodys.error("Email taken."));
    }

    if (userService.isUsernameTaken(user.getUsername())) {
      LOG.debug("Not creating user because email is taken.");

      return Responses.badRequestJsonResponse(Bodys.error("Username taken."));
    }

    User newUser = userService.createUser(user);

    if (newUser == null) {
      LOG.warn("Could not create user.");

      return Responses.badRequestJsonResponse(Bodys.error("Field missing for user."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }
}
