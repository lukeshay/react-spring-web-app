package com.lukeshay.restapi.gym;

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
class GymControllerTest {

  @Autowired PrivateGymController privateGymController;

  @Autowired PublicGymController publicGymController;

  @Autowired GymRepository gymRepository;

  private Gym testGym;

  @BeforeEach
  void setUp() {
    testGym =
        new Gym(
            "Jim",
            "street",
            "city",
            "state",
            "lukeshay.com",
            "climbing@gym.com",
            "phoneNumber",
            null);

    testGym = gymRepository.save(testGym);
  }

  @Test
  void getGymByIdTest() {
    ResponseEntity<?> response = publicGymController.getGymById(testGym.getId());

    Assertions.assertAll(
        () -> Assertions.assertEquals(testGym, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));
  }

  @Test
  void updateGymByIdTest() {
    ResponseEntity<?> response =
        privateGymController.updateGym(
            testGym.getId(), "Jimmy", null, null, null, null, null, null);

    testGym = gymRepository.findById(testGym.getId()).get();

    Assertions.assertEquals(testGym, response.getBody());
  }
}
