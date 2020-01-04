package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserTypes;
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
import org.springframework.security.test.context.support.WithMockUser;

@SpringBootTest
@AutoConfigureDataMongo
class GymControllerTest {

  private GymController gymController;

  @Autowired private GymRepository gymRepository;

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

    gymController = new GymController(new GymService(gymRepository, requests));
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
}
