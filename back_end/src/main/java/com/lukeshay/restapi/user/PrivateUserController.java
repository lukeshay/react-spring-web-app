package com.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import javax.websocket.server.PathParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class PrivateUserController {
  private static Logger LOG = LoggerFactory.getLogger(PrivateUserController.class.getName());

  private UserRepository userRepository;
  private UserService userService;

  @Autowired
  public PrivateUserController(UserService userService, UserRepository userRepository) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  @GetMapping(value = "", params = "username")
  public ResponseEntity<?> getUserByUsername(@PathParam(value = "username") String username) {
    LOG.debug("Getting user: {}", username);

    User user = userService.getUserByUsername(username);

    if (user == null) {
      LOG.debug("Could not find user");
      return Responses.notFoundJsonResponse(Bodys.error("User not found."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }

  @GetMapping(value = "", params = "email")
  public ResponseEntity<?> getUserByEmail(@PathParam(value = "email") String email) {
    LOG.debug("Getting user: {}", email);

    User user = userService.getUserByEmail(email);

    if (user == null) {
      LOG.debug("Could not find user");
      return Responses.notFoundJsonResponse(Bodys.error("User not found."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }

  @PutMapping(value = "", params = "userId")
  public ResponseEntity<?> updateUserById(
      @PathParam(value = "userId") String userId,
      @JsonProperty("username") String username,
      @JsonProperty("email") String email,
      @JsonProperty("firstName") String firstName,
      @JsonProperty("lastName") String lastName,
      @JsonProperty("city") String city,
      @JsonProperty("state") String state,
      @JsonProperty("country") String country) {

    LOG.debug("Updating user {}", userId);

    if (userService.isEmailTaken(email)) {
      LOG.debug("Not creating user because email is taken");

      return Responses.badRequestJsonResponse(Bodys.error("Email taken."));
    }

    if (userService.isUsernameTaken(username)) {
      LOG.debug("Not creating user because email is taken");

      return Responses.badRequestJsonResponse(Bodys.error("Username taken."));
    }

    User user =
        userService.updateUserById(
            userId, username, email, firstName, lastName, city, state, country);

    if (user == null) {
      LOG.debug("User was not found");

      return Responses.notFoundJsonResponse(Bodys.error("User not found."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }
}
