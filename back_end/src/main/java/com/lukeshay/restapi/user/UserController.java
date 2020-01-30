package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.utils.ResponseUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  public ResponseEntity<?> getUser(Authentication authentication) {
    LOG.debug("Getting user.");

    User user = userService.getUser(authentication);

    if (user == null) {
      LOG.debug("Could not find user");
      return ResponseUtils.notFound(BodyUtils.error("User not found."));
    } else {
      return ResponseUtils.ok(user);
    }
  }

  @PutMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Update a user.", response = User.class)
  public ResponseEntity<?> updateUser(
      Authentication authentication,
      @RequestParam("username") String username,
      @RequestParam("email") String email,
      @RequestParam("firstName") String firstName,
      @RequestParam("lastName") String lastName,
      @RequestParam("city") String city,
      @RequestParam("state") String state,
      @RequestParam("country") String country) {

    LOG.debug("Updating user.");

    ResponseEntity<?> response = checkDuplicate(authentication, email, username);

    if (response != null) {
      return response;
    }

    User user =
        userService.updateUser(
            authentication, username, email, firstName, lastName, city, state, country);

    if (user == null) {
      LOG.debug("User was not found");

      return ResponseUtils.badRequest(BodyUtils.error("User not found."));
    } else {
      return ResponseUtils.ok(user);
    }
  }

  @PostMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiOperation(value = "Create an admin user.", response = User.class)
  public ResponseEntity<?> createAdminUser(Authentication authentication, @RequestBody User user) {
    LOG.debug("Creating admin user {}", user.toString());

    ResponseEntity<?> response =
        checkDuplicate(authentication, user.getEmail(), user.getUsername());

    if (response != null) {
      return response;
    }

    return userService.createAdminUser(user);
  }

  @DeleteMapping("/{userId}")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiOperation(value = "Delete a user.", response = User.class)
  public ResponseEntity<?> deleteUserByUserId(
      Authentication authentication, @PathVariable String userId) {
    User deletedUser = userService.deleteUserById(userId);

    if (deletedUser == null) {
      return ResponseUtils.badRequest(BodyUtils.error("User not found."));
    } else {
      return ResponseUtils.ok(deletedUser);
    }
  }

  @PostMapping("/new")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Create a user.", response = User.class)
  public ResponseEntity<?> createUser(Authentication authentication, @RequestBody User user) {
    LOG.debug("Creating user {}", user.toString());

    ResponseEntity<?> response =
        checkDuplicate(authentication, user.getEmail(), user.getUsername());

    if (response != null) {
      return response;
    }

    return userService.createUser(user);
  }

  @GetMapping("/all")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiIgnore
  public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
    LOG.debug("Getting all users.");

    Iterable<User> users = userService.getAllUsers();

    return ResponseUtils.ok(users);
  }

  private ResponseEntity<?> checkDuplicate(
      Authentication authentication, String email, String username) {

    if (userService.isEmailTaken(authentication, email)) {
      LOG.debug("Not creating user because email is taken");

      return ResponseUtils.badRequest(BodyUtils.error("Email taken."));
    }

    if (userService.isUsernameTaken(authentication, username)) {
      LOG.debug("Not creating user because email is taken");

      return ResponseUtils.badRequest(BodyUtils.error("Username taken."));
    }

    return null;
  }
}
