package com.lukeshay.restapi.user;

import java.util.List;
import org.springframework.security.core.Authentication;

public interface UserService {

  User createAdminUser(User user);

  User createUser(User user);

  User deleteUserByUserId(String userId);

  List<User> getAllUsers();

  User getUser(Authentication authentication);

  boolean isEmailTaken(Authentication authentication, String email);

  boolean isUsernameTaken(Authentication authentication, String username);

  User updateUser(
      Authentication authentication,
      String username,
      String email,
      String firstName,
      String lastName,
      String city,
      String state,
      String country);
}
