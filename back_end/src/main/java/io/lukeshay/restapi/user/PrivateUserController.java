package io.lukeshay.restapi.user;

import javax.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class PrivateUserController {

  private UserService userService;

  @Autowired
  public PrivateUserController(UserService userService) {
    this.userService = userService;
  }

  @DeleteMapping("")
  public void deleteAllUsers() {
    userService.deleteAllUsers();
  }

  @GetMapping(value="", params = "username")
  public User getUserByUsername(@PathParam(value="username") String username) {
    return userService.getUserByUsername(username);
  }

  @GetMapping(value="", params = "email")
  public User getUserByEmail(@PathParam(value="email") String email) {
    return userService.getUserByEmail(email);
  }
}
