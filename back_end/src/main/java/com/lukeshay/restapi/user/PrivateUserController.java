package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.Exceptions;
import java.util.List;
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

  private UserRepository userRepository;

  @Autowired
  public PrivateUserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @DeleteMapping("")
  public void deleteAllUsers() {
    LOG.debug("Deleting all users");

    List<User> users = userRepository.findAll();
    users.forEach(user -> userRepository.delete(user));
  }

  @GetMapping(value = "", params = "username")
  public User getUserByUsername(@PathParam(value = "username") String username) {
    LOG.debug("Getting user: {}", username);

    return userRepository
        .findByUsername(username)
        .orElseThrow(() -> Exceptions.notFound(String.format("%s not found.", username)));
  }

  @GetMapping(value = "", params = "email")
  public User getUserByEmail(@PathParam(value = "email") String email) {
    LOG.debug("Getting user: {}", email);

    return userRepository
        .findByEmail(email)
        .orElseThrow(() -> Exceptions.notFound(String.format("%s not found.", email)));
  }

  @PutMapping(value = "", params = "userId")
  public User updateUserById(
      @PathParam(value = "userId") String userId, @RequestBody User updatedUser) {
    LOG.debug("Updating user {} to: {}", userId, updatedUser.toString());

    User oldUser =
        userRepository
            .findById(userId)
            .orElseThrow(() -> Exceptions.notFound(String.format("%s not found", userId)));

    oldUser.update(updatedUser);

    return userRepository.save(updatedUser);
  }
}
