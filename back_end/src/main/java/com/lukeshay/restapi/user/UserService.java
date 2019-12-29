package com.lukeshay.restapi.user;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
class UserService {

  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  @Autowired
  UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  boolean isEmailTaken(String email) {
    return userRepository.findByEmail(email).orElse(null) != null;
  }

  boolean isUsernameTaken(String username) {
    return userRepository.findByUsername(username).orElse(null) != null;
  }

  User createUser(User user) {
    if (user.getUsername() != null
        && user.getFirstName() != null
        && user.getLastName() != null
        && user.getEmail() != null
        && user.getPhoneNumber() != null
        && user.getState() != null
        && user.getCountry() != null
        && user.getPassword() != null) {

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setAuthorities(Collections.singletonList(UserTypes.ADMIN.authority()));
      user.setRoles(Collections.singletonList(UserTypes.ADMIN.role()));

      return userRepository.save(user);

    } else {
      return null;
    }
  }

  User createAdminUser(User user) {
    if (user.getUsername() != null
        && user.getFirstName() != null
        && user.getLastName() != null
        && user.getEmail() != null
        && user.getPhoneNumber() != null
        && user.getState() != null
        && user.getCountry() != null
        && user.getPassword() != null) {

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setAuthorities(Collections.singletonList(UserTypes.ADMIN.authority()));
      user.setAuthorities(Collections.singletonList(UserTypes.ADMIN.role()));

      return userRepository.save(user);

    } else {
      return null;
    }
  }

  User getUserByUsername(String username) {
    return userRepository.findByUsername(username).orElse(null);
  }

  User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  User updateUserById(
      String userId,
      String username,
      String email,
      String firstName,
      String lastName,
      String city,
      String state,
      String country) {

    User toUpdate = userRepository.findById(userId).orElse(null);

    if (toUpdate == null) {
      return null;
    }

    if (username != null && !username.equals("")) {
      toUpdate.setUsername(username);
    }

    if (email != null && !email.equals("")) {
      toUpdate.setEmail(email);
    }

    if (firstName != null && !firstName.equals("")) {
      toUpdate.setFirstName(firstName);
    }

    if (lastName != null && !lastName.equals("")) {
      toUpdate.setLastName(lastName);
    }

    if (city != null && !city.equals("")) {
      toUpdate.setCity(city);
    }

    if (state != null && !state.equals("")) {
      toUpdate.setState(state);
    }

    if (country != null && !country.equals("")) {
      toUpdate.setCountry(country);
    }

    toUpdate.setPersistable(true);

    return userRepository.save(toUpdate);
  }

  User deleteUserByUserId(String userId) {
    User deletedUser = userRepository.findById(userId).orElse(null);

    if (deletedUser == null) {
      return null;
    } else {
      userRepository.deleteById(userId);
      return deletedUser;
    }
  }
}
