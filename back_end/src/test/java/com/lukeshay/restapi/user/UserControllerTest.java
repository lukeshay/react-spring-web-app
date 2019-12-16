package com.lukeshay.restapi.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

@SpringBootTest
@AutoConfigureDataMongo
class UserControllerTest {

  @Autowired
  private PublicUserController publicUserController;

  @Autowired
  private PrivateUserController privateUserController;

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
    User getUser = privateUserController.getUserByEmail(testUser.getEmail());
    Assertions.assertEquals(testUser, getUser, "Users are not the same.");
  }

  @Test
  void getUserByUsernameTest() {
    User getUser = privateUserController.getUserByUsername(testUser.getUsername());
    Assertions.assertEquals(testUser, getUser, "Users are not the same.");
  }

  @Test
  void createUserTest() {
    User testUserTwo = new User("TestUserTwo", "Test", "User", "test.user.two@email.com",
        "1111111111", "Iowa",
        "USA", "password");
    testUserTwo.setLastName("User");

    User getUser = publicUserController.createUser(testUserTwo);
    testUserTwo = userRepository.findByUsername(testUserTwo.getUsername()).get();

    Assertions.assertEquals(testUserTwo, getUser, "User was not saved correctly.");
  }

  @Test
  void createUserDuplicateTest() {
    Assertions.assertThrows(ResponseStatusException.class,
        () -> publicUserController.createUser(testUser), "Did not throw email taken error.");

    testUser.setEmail("testtest@email.com");

    Assertions.assertThrows(ResponseStatusException.class,
        () -> publicUserController.createUser(testUser), "Did not throw username taken error.");
  }

  @Test
  void updateUserByIdTest() {
    testUser.setUsername("TestUserChange");
    testUser.setFirstName("First");
    testUser.setLastName("Last");
    testUser.setPassword("changed");
    testUser.setPersistable(true);

    User updatedUser = privateUserController.updateUserById(testUser.getUserId(), testUser);

    Assertions.assertEquals(testUser, updatedUser, "The user was not updated correctly.");
  }

}
