package com.lukeshay.restapi.user;

import com.lukeshay.restapi.security.UserPrincipal;
import com.lukeshay.restapi.utils.AuthenticationUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
  public User createAdminUser(User user) {
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

      return userRepository.save(user);

    } else {
      return null;
    }
  }

  @Override
  public User createUser(User user) {
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
      user.setAuthority(UserTypes.ADMIN.authority());
      user.setRole(UserTypes.ADMIN.role());

      return userRepository.save(user);

    } else {
      return null;
    }
  }

  @Override
  public User deleteUserByUserId(String userId) {
    User deletedUser = userRepository.findById(userId).orElse(null);

    if (deletedUser == null) {
      return null;
    } else {
      userRepository.deleteById(userId);
      return deletedUser;
    }
  }

  @Override
  public User getUser(Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

    return userPrincipal.getUser();
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
