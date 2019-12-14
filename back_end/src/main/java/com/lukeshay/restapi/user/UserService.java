package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.Exceptions;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  User saveUser(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setAuthorities(Collections.singletonList(UserTypes.BASIC.authority()));
    user.setAuthorities(Collections.singletonList(UserTypes.BASIC.role()));
    userRepository.save(user);
    return userRepository.findByUsername(user.getUsername()).orElseThrow(() -> Exceptions
        .internalServerError(String.format("%s was not saved.", user.getUsername())));
  }

  void deleteAllUsers() {
    List<User> users = userRepository.findAll();

    users.forEach(user -> userRepository.delete(user));
  }

  User getUserByUsername(String username) {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> Exceptions.notFound(String.format("%s not found.", username)));
  }

  User getUserByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> Exceptions.notFound(String.format("%s not found.", email)));
  }

  User updateUserById(String userId, User updatedUser) {
    User oldUser = userRepository.findById(userId)
        .orElseThrow(() -> Exceptions.notFound(String.format("%s not found", userId)));

    updatedUser.setUserId(oldUser.getUserId());

    return userRepository.save(updatedUser);
  }
}
