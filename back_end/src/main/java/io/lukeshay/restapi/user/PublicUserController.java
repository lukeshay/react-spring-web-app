package io.lukeshay.restapi.user;

import io.lukeshay.restapi.utils.Exceptions;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/users")
public class PublicUserController {
  private static Logger logger = Logger.getLogger(PublicUserController.class.getName());
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
      logger.info(String.format("Creating new user: %s", user.getUsername()));
      return userService.saveUser(user);
    } else {
      logger.warning(String.format("Error creating new user: %s", user.getUsername()));
      throw Exceptions.badRequest("Missing a field.");
    }

  }

  @PutMapping("")
  public User updateUser(@RequestBody User user) {
    return user;
  }
}
