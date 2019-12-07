package io.lukeshay.restapi.user;

import io.lukeshay.restapi.utils.Exceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

  private UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @RequestMapping(method = RequestMethod.POST, value = "")
  public User createUser(@RequestBody User user) {

    if (user.getUsername() != null && user.getFirstName() != null && user.getLastName() != null
        && user.getEmail() != null && user.getPhoneNumber() != null && user.getState() != null
        && user.getCountry() != null && user.getPassword() != null) {
      return userService.saveUser(user);
    } else {
      throw Exceptions.badRequest("Missing a field.");
    }

  }

  @DeleteMapping("")
  public void deleteAllUsers() {
    userService.deleteAllUsers();
  }
}
