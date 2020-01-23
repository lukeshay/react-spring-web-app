package com.lukeshay.restapi.user;

import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.utils.Body;
import javax.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;

@SpringBootTest
@AutoConfigureDataMongo
class UserControllerTest {

  private UserController userController;

  @Autowired private UserRepository userRepository;

  @Autowired private PasswordEncoder passwordEncoder;

  @Mock private HttpServletRequest request;

  @Mock private Requests requests;

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

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(testUser);

    userController = new UserController(new UserService(userRepository, passwordEncoder, requests));
  }

  @Test
  @WithMockUser
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

    ResponseEntity<?> getUser = userController.createUser(request, testUserTwo);
    testUserTwo = userRepository.findByUsername(testUserTwo.getUsername()).get();

    Assertions.assertEquals(testUserTwo, getUser.getBody());
  }

  @Test
  @WithMockUser
  void createUserDuplicateTest() {
    Mockito.when(requests.getUserFromRequest(request)).thenReturn(null);

    ResponseEntity<?> responseEmail = userController.createUser(request, testUser);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Email taken."), responseEmail.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEmail.getStatusCode()));

    testUser.setEmail("testtest@email.com");

    ResponseEntity<?> responseUsername = userController.createUser(request, testUser);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Username taken."), responseUsername.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseUsername.getStatusCode()));
  }

  @Test
  @WithMockUser
  void updateUserByIdTest() {
    testUser.setUsername("TestUserChange");
    testUser.setFirstName("First");
    testUser.setLastName("Last");
    testUser.setPersistable(true);

    ResponseEntity<?> updatedUser =
        userController.updateUser(
            request,
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
    testUser.setUserId(null);

    testUser = userRepository.save(testUser);

    ResponseEntity<?> response =
        userController.updateUser(
            request, "test.user@email.com", null, null, null, null, null, null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Username taken."), response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode()));
  }
}
