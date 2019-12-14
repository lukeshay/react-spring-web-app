package com.lukeshay.restapi.user;

import javax.websocket.server.PathParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class PrivateUserController {
  private static Logger LOG = LoggerFactory.getLogger(PrivateUserController.class.getName());
  private UserService userService;

  @Autowired
  public PrivateUserController(UserService userService) {
    this.userService = userService;
  }

  @DeleteMapping("")
  public void deleteAllUsers() {
    LOG.debug("Deleting all users");
    userService.deleteAllUsers();
  }

  @GetMapping(value = "", params = "username")
  public User getUserByUsername(@PathParam(value = "username") String username) {
    LOG.debug("Getting user: {}", username);
    return userService.getUserByUsername(username);
  }

  @GetMapping(value = "", params = "email")
  public User getUserByEmail(@PathParam(value = "email") String email) {
    LOG.debug("Getting user: {}", email);
    return userService.getUserByEmail(email);
  }

  @PutMapping(value = "", params = "userId")
  public User updateUserById(@PathParam(value = "userId") String userId, @RequestBody User updatedUser) {
    LOG.debug("Updating user {} to: {}", userId, updatedUser.toString());
    return userService.updateUserById(userId, updatedUser);
  }
}
