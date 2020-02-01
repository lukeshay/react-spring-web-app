package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.utils.BodyUtils;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.web.multipart.MultipartFile;

class GymControllerTest extends TestBase {

  private GymController gymController;
  private Gym testGym;
  private MultipartFile testFile;

  @BeforeEach
  void setUp() {
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
            Collections.singletonList(testUser.getId()));

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
    Mockito.when(awsService.uploadFileToS3(testGym.getId() + "/logo.jpg", testFile))
        .thenReturn("some/url.jpg");

    // Create class under test
    gymController = new GymController(new GymServiceImpl(gymRepository, awsService));
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
            authentication,
            testGym.getId(),
            new Gym("Jimmy", null, null, null, null, null, null, null, null));

    testGym = gymRepository.findById(testGym.getId()).get();

    Assertions.assertEquals(testGym, response.getBody());

    ResponseEntity<?> gymNotFoundResponse =
        gymController.updateGym(
            authentication,
            UUID.randomUUID().toString(),
            new Gym("Jimmy", null, null, null, null, null, null, null, null));

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, gymNotFoundResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Gym not found"), gymNotFoundResponse.getBody()));

    testUserPrincipal.getUser().setId(UUID.randomUUID().toString());

    ResponseEntity<?> unauthorizedResponse =
        gymController.updateGym(
            authentication,
            testGym.getId(),
            new Gym("Jimmy", null, null, null, null, null, null, null, null));

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, unauthorizedResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Gym not found"), unauthorizedResponse.getBody()));
  }

  @Test
  void uploadLogoTest() {

    ResponseEntity<?> response =
        gymController.uploadLogo(authentication, testFile, testGym.getId(), "logo");

    testGym = gymRepository.findById(testGym.getId()).orElse(null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testGym, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));

    ResponseEntity<?> invalidNameResponse =
        gymController.uploadLogo(authentication, testFile, testGym.getId(), "invalid");

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Invalid upload."), invalidNameResponse.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, invalidNameResponse.getStatusCode()));

    Mockito.when(awsService.uploadFileToS3(Mockito.anyString(), Mockito.any(MultipartFile.class)))
        .thenReturn(null);

    ResponseEntity<?> errorResponse =
        gymController.uploadLogo(authentication, testFile, testGym.getId(), "logo");

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                HttpStatus.INTERNAL_SERVER_ERROR, errorResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error uploading file."), errorResponse.getBody()));

    testUserPrincipal.getUser().setId(UUID.randomUUID().toString());

    ResponseEntity<?> unauthorizedResponse =
        gymController.uploadLogo(authentication, testFile, testGym.getId(), "logo");

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(HttpStatus.UNAUTHORIZED, unauthorizedResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                BodyUtils.error("You are unauthorized to perform this action."),
                unauthorizedResponse.getBody()));
  }

  @Test
  void getGymsTest() {
    populateGyms();

    ResponseEntity<Page<Gym>> response = gymController.getGyms(null, null, 0, 0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(20, response.getBody().getTotalElements()),
        () -> Assertions.assertEquals(20, response.getBody().getNumberOfElements()),
        () -> Assertions.assertEquals(1, response.getBody().getTotalPages()),
        () -> Assertions.assertEquals(20, response.getBody().getContent().size()));

    ResponseEntity<Page<Gym>> responseNums = gymController.getGyms(null, null, 5, 2);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, responseNums.getStatusCode()),
        () -> Assertions.assertEquals(20, responseNums.getBody().getTotalElements()),
        () -> Assertions.assertEquals(5, responseNums.getBody().getNumberOfElements()),
        () -> Assertions.assertEquals(4, responseNums.getBody().getTotalPages()),
        () -> Assertions.assertEquals(5, responseNums.getBody().getContent().size()));

    ResponseEntity<Page<Gym>> responseQuery = gymController.getGyms("1", null, null, null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, responseQuery.getStatusCode()),
        () -> Assertions.assertEquals(10, responseQuery.getBody().getTotalElements()),
        () -> Assertions.assertEquals(10, responseQuery.getBody().getNumberOfElements()),
        () -> Assertions.assertEquals(1, responseQuery.getBody().getTotalPages()),
        () -> Assertions.assertEquals(10, responseQuery.getBody().getContent().size()));
  }

  private void populateGyms() {
    for (int i = 0; i < 19; i++) {
      Gym gym =
          new Gym(
              "Jim" + i,
              "street",
              "city",
              "state",
              "50014",
              "lukeshay.com",
              "climbing@gym.com",
              "phoneNumber",
              Collections.singletonList(testUser.getId()));

      gymRepository.save(gym);
    }
  }
}
