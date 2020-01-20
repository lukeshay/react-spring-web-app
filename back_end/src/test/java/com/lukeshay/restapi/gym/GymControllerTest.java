package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.services.AwsService;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserTypes;
import com.lukeshay.restapi.utils.Bodys;
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
  @Autowired private AwsService awsService;

  @Mock private HttpServletRequest request;
  @Mock private Requests requests;

  private Gym testGym;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);

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

    testGym = gymRepository.save(testGym);

    requests = Mockito.mock(Requests.class);

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

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(user);

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
    Path path = Paths.get(System.getProperty("user.dir") + "/src/test/resources/logo.jpg");
    String name = "file.txt";
    String originalFileName = "file.txt";
    String contentType = "text/plain";
    byte[] content = null;

    try {
      content = Files.readAllBytes(path);
    } catch (final IOException ignored) {
    }

    MultipartFile testFile = new MockMultipartFile(name, originalFileName, contentType, content);

    ResponseEntity<?> response = gymController.uploadLogo(request, testFile, testGym.getId());

    testGym = gymRepository.findById(testGym.getId()).orElse(null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testGym, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(null);

    ResponseEntity<?> unauthorizedResponse =
        gymController.uploadLogo(request, testFile, testGym.getId());

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(HttpStatus.UNAUTHORIZED, unauthorizedResponse.getStatusCode()),
        () ->
            Assertions.assertEquals(
                Bodys.error("You are unauthorized to perform this action."),
                unauthorizedResponse.getBody()));
  }
}
