package com.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/users")
@PreAuthorize("isAuthenticated()")
@Api(value = "User api endpoints.")
public class UserController {

  private static Logger LOG = LoggerFactory.getLogger(UserController.class.getName());

  private UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Get a user by email.", response = User.class)
  public ResponseEntity<?> getUser(HttpServletRequest request) {
    LOG.debug("Getting user.");

    User user = userService.getUser(request);

    if (user == null) {
      LOG.debug("Could not find user");
      return Responses.notFoundJsonResponse(Bodys.error("User not found."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }

  @PutMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Update a user.", response = User.class)
  public ResponseEntity<?> updateUser(
      HttpServletRequest request,
      @JsonProperty("username") String username,
      @JsonProperty("email") String email,
      @JsonProperty("firstName") String firstName,
      @JsonProperty("lastName") String lastName,
      @JsonProperty("city") String city,
      @JsonProperty("state") String state,
      @JsonProperty("country") String country) {

    LOG.debug("Updating user.");

    ResponseEntity<?> response = checkDuplicate(request, email, username);

    if (response != null) {
      return response;
    }

    User user =
        userService.updateUser(request, username, email, firstName, lastName, city, state, country);

    if (user == null) {
      LOG.debug("User was not found");

      return Responses.badRequestJsonResponse(Bodys.error("User not found."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }

  @PostMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiOperation(value = "Create an admin user.", response = User.class)
  public ResponseEntity<?> createAdminUser(HttpServletRequest request, @RequestBody User user) {
    LOG.debug("Creating admin user {}", user.toString());

    ResponseEntity<?> response = checkDuplicate(request, user.getEmail(), user.getUsername());

    if (response != null) {
      return response;
    }

    User newUser = userService.createAdminUser(user);

    if (newUser == null) {
      LOG.warn("Could not create admin user.");

      return Responses.badRequestJsonResponse(Bodys.error("Field missing for user."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }

  @DeleteMapping("/{userId}")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiOperation(value = "Delete a user.", response = User.class)
  public ResponseEntity<?> deleteUserByUserId(@PathVariable String userId) {
    User deletedUser = userService.deleteUserByUserId(userId);

    if (deletedUser == null) {
      return Responses.badRequestJsonResponse(Bodys.error("User not found."));
    } else {
      return Responses.okJsonResponse(deletedUser);
    }
  }

  @PostMapping("/new")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Create a user.", response = User.class)
  public ResponseEntity<?> createUser(HttpServletRequest request, @RequestBody User user) {
    LOG.debug("Creating user {}", user.toString());

    ResponseEntity<?> response = checkDuplicate(request, user.getEmail(), user.getUsername());

    if (response != null) {
      return response;
    }

    User newUser = userService.createUser(user);

    if (newUser == null) {
      LOG.warn("Could not create user.");

      return Responses.badRequestJsonResponse(Bodys.error("Field missing for user."));
    } else {
      return Responses.okJsonResponse(user);
    }
  }

  @GetMapping("/all")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiIgnore
  public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
    LOG.debug("Getting all users.");

    List<User> users = userService.getAllUsers();

    return Responses.okJsonResponse(users);
  }

  private ResponseEntity<?> checkDuplicate(
      HttpServletRequest request, String email, String username) {

    if (userService.isEmailTaken(request, email)) {
      LOG.debug("Not creating user because email is taken");

      return Responses.badRequestJsonResponse(Bodys.error("Email taken."));
    }

    if (userService.isUsernameTaken(request, username)) {
      LOG.debug("Not creating user because email is taken");

      return Responses.badRequestJsonResponse(Bodys.error("Username taken."));
    }

    return null;
  }
}
