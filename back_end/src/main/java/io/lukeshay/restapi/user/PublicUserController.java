package io.lukeshay.restapi.user;

import io.lukeshay.restapi.utils.Exceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/public/users")
public class PublicUserController {

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
      return userService.saveUser(user);
    } else {
      throw Exceptions.badRequest("Missing a field.");
    }

  }

  @PutMapping("")
  public User updateUser(@RequestBody User user) {
    return user;
  }
}
