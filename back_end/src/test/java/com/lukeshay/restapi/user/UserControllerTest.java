package com.lukeshay.restapi.user;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.security.UserPrincipal;
import com.lukeshay.restapi.utils.BodyUtils;
import java.util.Collections;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;

class UserControllerTest extends TestBase {

  private UserController userController;
  @Autowired private UserService userService;

  @BeforeEach
  void setUp() {
    userController = new UserController(userService);
  }

  @Test
  void createUserTest() {
    authentication =
        new UsernamePasswordAuthenticationToken(
            new UserPrincipal(null), null, Collections.emptyList());
    User testUserTwo =
        new User(
            "TestUserTwo",
            "Test",
            "User",
            "test.user.two@email.com",
            "1111111111",
            "Des Moines",
            "Iowa",
            "USA",
            "password");
    testUserTwo.setLastName("User");

    ResponseEntity<?> getUser = userController.createUser(authentication, testUserTwo);
    testUserTwo = userRepository.findByUsername(testUserTwo.getUsername()).get();

    Assertions.assertEquals(testUserTwo, getUser.getBody());

    testUser.setId(null);
    ResponseEntity<?> responseEmail = userController.createUser(authentication, testUser);

    Assertions.assertAll(
        () -> Assertions.assertEquals(BodyUtils.error("Email taken."), responseEmail.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEmail.getStatusCode()));

    testUser.setEmail("testtest@email.com");

    ResponseEntity<?> responseUsername = userController.createUser(authentication, testUser);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(BodyUtils.error("Username taken."), responseUsername.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseUsername.getStatusCode()));
  }

  @Test
  @WithMockUser
  void updateUserByIdTest() {
    testUser.setUsername("TestUserChange");
    testUser.setFirstName("First");
    testUser.setLastName("Last");

    ResponseEntity<?> updatedUser =
        userController.updateUser(
            authentication,
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
  @WithMockUser
  void updateUserByIdDuplicateTest() {
    testUser.setUsername("test.user2@email.com");
    testUser.setEmail("test.user2@email.com");
    testUser.setId(null);

    testUser = userRepository.save(testUser);

    ResponseEntity<?> response =
        userController.updateUser(
            authentication, "test.user@email.com", null, null, null, null, null, null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(BodyUtils.error("Username taken."), response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode()));
  }
}
