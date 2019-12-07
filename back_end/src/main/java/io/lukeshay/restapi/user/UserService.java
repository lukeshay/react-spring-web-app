package io.lukeshay.restapi.user;

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
    user.setAuthorities(Collections.singletonList(UserAuthorities.BASIC.role()));
    userRepository.save(user);
    return userRepository.findByUsername(user.getUsername());
  }

  void deleteAllUsers() {
    List<User> users = userRepository.findAll();

    users.forEach(user -> userRepository.delete(user));
  }
}
