package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.services.AwsService;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserTypes;
import com.lukeshay.restapi.utils.Body;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import javax.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
@AutoConfigureDataMongo
class GymControllerTest {

  private GymController gymController;

  @Autowired private GymRepository gymRepository;

  @Mock private AwsService awsService;
  @Mock private HttpServletRequest request;
  @Mock private Requests requests;

  private Gym testGym;
  private MultipartFile testFile;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);

    // Initialize objects
    testGym =
        new Gym(
            "Jim",
            "street",
            "city",
            "state",
            "50014",
            "lukeshay.com",
            "climbing@gym.com",
            "phoneNumber",
            Collections.singletonList("1111111111"));

    User user =
        new User(
            "test.user@email.com",
            "Test",
            "User",
            "test.user@email.com",
            "1111111111",
            "Iowa",
            "USA",
            "password");

    user.setUserId("1111111111");
    user.setAuthorities(Collections.singletonList(UserTypes.BASIC.authority()));

    // Setup files
    Path path = Paths.get(System.getProperty("user.dir") + "/src/test/resources/logo.jpg");
    String name = "file.txt";
    String originalFileName = "file.txt";
    String contentType = "text/plain";
    byte[] content = null;

    try {
      content = Files.readAllBytes(path);
    } catch (final IOException ignored) {
    }

    testFile = new MockMultipartFile(name, originalFileName, contentType, content);

    // Save gym
    testGym = gymRepository.save(testGym);

    // Mock methods
    Mockito.when(requests.getUserFromRequest(request)).thenReturn(user);
    Mockito.when(awsService.uploadFileToS3(testGym.getId() + "/logo.jpg", testFile))
        .thenReturn("some/url.jpg");

    // Create class under test
    gymController = new GymController(new GymService(gymRepository, requests, awsService));
  }

  @Test
  @WithMockUser
  void getGymByIdTest() {
    ResponseEntity<?> response = gymController.getGymById(testGym.getId());

    Assertions.assertAll(
        () -> Assertions.assertEquals(testGym, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));
  }

  @Test
  @WithMockUser
  void updateGymByIdTest() {
    ResponseEntity<?> response =
        gymController.updateGym(
            request,
            testGym.getId(),
            new Gym("Jimmy", null, null, null, null, null, null, null, null));

    testGym = gymRepository.findById(testGym.getId()).get();

    Assertions.assertEquals(testGym, response.getBody());
  }

  @Test
  void uploadLogoTest() {

    ResponseEntity<?> response =
        gymController.uploadLogo(request, testFile, testGym.getId(), "logo");

    testGym = gymRepository.findById(testGym.getId()).orElse(null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testGym, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));

    ResponseEntity<?> invalidNameResponse =
        gymController.uploadLogo(request, testFile, testGym.getId(), "invalid");

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(Body.error("Invalid upload."), invalidNameResponse.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, invalidNameResponse.getStatusCode()));

    Mockito.when(awsService.uploadFileToS3(testGym.getId() + "/logo.jpg", testFile))
        .thenReturn(null);

    ResponseEntity<?> errorResponse =
        gymController.uploadLogo(request, testFile, testGym.getId(), "logo");

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                HttpStatus.INTERNAL_SERVER_ERROR, errorResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(Body.error("Error uploading file."), errorResponse.getBody()));

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(null);

    ResponseEntity<?> unauthorizedResponse =
        gymController.uploadLogo(request, testFile, testGym.getId(), "logo");

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(HttpStatus.UNAUTHORIZED, unauthorizedResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Body.error("You are unauthorized to perform this action."),
                unauthorizedResponse.getBody()));
  }
}
