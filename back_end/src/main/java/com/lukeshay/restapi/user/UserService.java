package com.lukeshay.restapi.user;

import com.lukeshay.restapi.services.Requests;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
class UserService {

  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;
  private Requests requests;

  @Autowired
  UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, Requests requests) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.requests = requests;
  }

  boolean isEmailTaken(HttpServletRequest request, String email) {
    User user = requests.getUserFromRequest(request);

    return (user == null || !user.getEmail().equals(email))
        && userRepository.findByEmail(email).orElse(null) != null;
  }

  boolean isUsernameTaken(HttpServletRequest request, String username) {
    User user = requests.getUserFromRequest(request);

    return (user == null || !user.getUsername().equals(username))
        && userRepository.findByUsername(username).orElse(null) != null;
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
      user.setRoles(Collections.singletonList(UserTypes.ADMIN.role()));

      return userRepository.save(user);

    } else {
      return null;
    }
  }

  User getUser(HttpServletRequest request) {
    return requests.getUserFromRequest(request);
  }

  User updateUser(
      HttpServletRequest request,
      String username,
      String email,
      String firstName,
      String lastName,
      String city,
      String state,
      String country) {

    User user = requests.getUserFromRequest(request);

    assert user != null;
    User toUpdate = userRepository.findById(user.getUserId()).orElse(null);

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

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }
}
