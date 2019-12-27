package com.lukeshay.restapi.user;

import com.lukeshay.restapi.utils.Bodys;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
@AutoConfigureDataMongo
class UserControllerTest {

  @Autowired private PublicUserController publicUserController;

  @Autowired private PrivateUserController privateUserController;

  @Autowired private UserRepository userRepository;

  private User testUser;

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
    testUser =
        new User(
            "test.user@email.com",
            "Test",
            "User",
            "test.user@email.com",
            "1111111111",
            "Iowa",
            "USA",
            "password");
    testUser = userRepository.save(testUser);
  }

  @Test
  void getUserByEmailTest() {
    ResponseEntity<?> getUser = privateUserController.getUserByEmail(testUser.getEmail());

    Assertions.assertEquals(testUser, getUser.getBody());
  }

  @Test
  void getUserByUsernameTest() {
    ResponseEntity<?> getUser = privateUserController.getUserByUsername(testUser.getUsername());

    Assertions.assertEquals(testUser, getUser.getBody());
  }

  @Test
  void createUserTest() {
    User testUserTwo =
        new User(
            "TestUserTwo",
            "Test",
            "User",
            "test.user.two@email.com",
            "1111111111",
            "Iowa",
            "USA",
            "password");
    testUserTwo.setLastName("User");

    ResponseEntity<?> getUser = publicUserController.createUser(testUserTwo);
    testUserTwo = userRepository.findByUsername(testUserTwo.getUsername()).get();

    Assertions.assertEquals(testUserTwo, getUser.getBody());
  }

  @Test
  void createUserDuplicateTest() {
    ResponseEntity<?> responseEmail = publicUserController.createUser(testUser);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Bodys.error("Email taken."), responseEmail.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEmail.getStatusCode()));

    testUser.setEmail("testtest@email.com");

    ResponseEntity<?> responseUsername = publicUserController.createUser(testUser);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Bodys.error("Username taken."), responseUsername.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseUsername.getStatusCode()));
  }

  @Test
  void updateUserByIdTest() {
    testUser.setUsername("TestUserChange");
    testUser.setFirstName("First");
    testUser.setLastName("Last");
    testUser.setPersistable(true);

    ResponseEntity<?> updatedUser =
        privateUserController.updateUserById(
            testUser.getUserId(),
            testUser.getUsername(),
            null,
            testUser.getFirstName(),
            testUser.getLastName(),
            null,
            null,
            null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testUser, updatedUser.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, updatedUser.getStatusCode()));
  }

  @Test
  void updateUserByIdDuplicateTest() {
    testUser.setUsername("test.user2@email.com");
    testUser.setEmail("test.user2@email.com");
    testUser.setUserId(null);

    testUser = userRepository.save(testUser);

    ResponseEntity<?> response =
        privateUserController.updateUserById(
            testUser.getUserId(), "test.user@email.com", null, null, null, null, null, null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Bodys.error("Username taken."), response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode()));
  }
}
