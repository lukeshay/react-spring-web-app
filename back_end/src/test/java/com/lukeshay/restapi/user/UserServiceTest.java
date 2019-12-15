package com.lukeshay.restapi.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureDataMongo
class UserServiceTest {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  private User testUser;

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
    testUser = new User("TestUser", "Test", "User", "test.user@email.com", "1111111111", "Iowa",
        "USA", "password");
    testUser = userRepository.save(testUser);
  }

  @Test
  void getUserByEmailTest() {
    User getUser = userService.getUserByEmail(testUser.getEmail());

    System.out.println(getUser.toString());
    System.out.println(testUser.toString());

    Assertions.assertEquals(testUser, getUser, "Users are not the same.");
  }

  @Test
  void getUserByUsernameTest() {
    User getUser = userService.getUserByUsername(testUser.getUsername());
    Assertions.assertEquals(testUser, getUser, "Users are not the same.");
  }

  @Test
  void saveUserTest() {
    User testUserTwo = new User("TestUserTwo", "Test", "User", "test.user.two@email.com", "1111111111", "Iowa",
        "USA", "password");

    User getUser = userService.saveUser(testUserTwo);
    testUserTwo = userRepository.findByUsername(testUserTwo.getUsername()).get();

    Assertions.assertEquals(testUserTwo, getUser, "User was not saved correctly.");
  }

  @Test
  void updateUserByIdTest() {
    testUser.setUsername("TestUserChange");
    testUser.setFirstName("First");
    testUser.setLastName("Last");
    testUser.setPassword("changed");
    testUser.setPersistable(true);

    User updatedUser = userService.updateUserById(testUser.getUserId(), testUser);

    Assertions.assertEquals(testUser, updatedUser, "The user was not updated correctly.");
  }

}
