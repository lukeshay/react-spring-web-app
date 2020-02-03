package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.AuthenticationUtils;
import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public ResponseEntity<?> createAdminUser(User user) {
    if (user.getUsername() != null
        && user.getFirstName() != null
        && user.getLastName() != null
        && user.getEmail() != null
        && user.getPhoneNumber() != null
        && user.getState() != null
        && user.getCountry() != null
        && user.getPassword() != null) {

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setAuthority(UserTypes.ADMIN.authority());
      user.setRole(UserTypes.ADMIN.role());

      LOG.debug("Creating admin user: {}", user);

      return ResponseUtils.ok(userRepository.save(user));

    } else {
      LOG.debug("Could not create admin user: {}", user);
      return ResponseUtils.badRequest(BodyUtils.error("Field missing for user."));
    }
  }

  @Override
  public ResponseEntity<?> createUser(User user) {
    if (user.getUsername() != null
        && user.getFirstName() != null
        && user.getLastName() != null
        && user.getEmail() != null
        && user.getPhoneNumber() != null
        && user.getCity() != null
        && user.getState() != null
        && user.getCountry() != null
        && user.getPassword() != null) {

      user.setPassword(passwordEncoder.encode(user.getPassword()));
      user.setAuthority(UserTypes.BASIC.authority());
      user.setRole(UserTypes.BASIC.role());

      LOG.debug("Creating basic user: {}", user);

      return ResponseUtils.ok(userRepository.save(user));

    } else {
      LOG.debug("Could not create basic user: {}", user);
      return ResponseUtils.badRequest(BodyUtils.error("Field missing for user."));
    }
  }

  @Override
  public User deleteUserById(String id) {
    User deletedUser = userRepository.findById(id).orElse(null);

    if (deletedUser == null) {
      return null;
    } else {
      userRepository.deleteById(id);
      return deletedUser;
    }
  }

  @Override
  public User getUser(Authentication authentication) {
    return AuthenticationUtils.getUser(authentication);
  }

  @Override
  public Iterable<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public boolean isEmailTaken(Authentication authentication, String email) {
    User user = AuthenticationUtils.getUser(authentication);

    return (user == null || !user.getEmail().equals(email))
        && userRepository.findByEmail(email).orElse(null) != null;
  }

  @Override
  public boolean isUsernameTaken(Authentication authentication, String username) {
    User user = AuthenticationUtils.getUser(authentication);

    return (user == null || !user.getUsername().equals(username))
        && userRepository.findByUsername(username).orElse(null) != null;
  }

  @Override
  public User updateUser(
      Authentication authentication,
      String username,
      String email,
      String firstName,
      String lastName,
      String city,
      String state,
      String country) {

    User user = AuthenticationUtils.getUser(authentication);

    assert user != null;
    User toUpdate = userRepository.findById(user.getId()).orElse(null);

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

    return userRepository.save(toUpdate);
  }
}
