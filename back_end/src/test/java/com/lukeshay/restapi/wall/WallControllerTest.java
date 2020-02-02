package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.Collections;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

public class WallControllerTest extends TestBase {

  private WallController wallController;
  @Autowired private WallService wallService;
  private Gym testGym;
  private Wall testWall;

  @BeforeEach
  void setUp() {
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

    testGym = gymRepository.save(testGym);

    wallController = new WallController(wallService);

    testWall = new Wall(testGym.getId(), "Wall", Collections.singletonList(WallTypes.AUTO_BELAY));
  }

  @AfterEach
  void tearDown() {
    wallRepository.deleteAll();
    gymRepository.deleteAll();
  }

  @Test
  @WithMockUser
  void createWallTest() {
    ResponseEntity<?> response = wallController.createWall(authentication, testWall);

    testWall = wallRepository.findAll().get(0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));

    ResponseEntity<?> responseWithId = wallController.createWall(authentication, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(BodyUtils.error("Invalid wall."), responseWithId.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseWithId.getStatusCode()));

    testWall.setId(null);
    testWall.setGymId(UUID.randomUUID().toString());

    ResponseEntity<?> responseInvalidGymId = wallController.createWall(authentication, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Gym doesn't exist."), responseInvalidGymId.getBody()),
        () ->
            Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseInvalidGymId.getStatusCode()));
  }

  @Test
  @WithMockUser
  void updateWallTest() {
    testWall = wallRepository.save(testWall);
    testWall.setName("YEET");

    ResponseEntity<?> responseUpdate = wallController.updateWall(authentication, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, responseUpdate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, responseUpdate.getStatusCode()));

    ResponseEntity<?> responseNoUpdate = wallController.updateWall(authentication, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, responseNoUpdate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, responseNoUpdate.getStatusCode()));

    String wallId = testWall.getId();

    testWall.setId(null);

    ResponseEntity<?> responseNoWallId = wallController.updateWall(authentication, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error updating wall."), responseNoWallId.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWallId.getStatusCode()));

    testWall.setId(wallId);
    testWall.setGymId(null);

    ResponseEntity<?> responseNoGymId = wallController.updateWall(authentication, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error updating wall."), responseNoGymId.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoGymId.getStatusCode()));
  }

  @Test
  @WithMockUser
  void deleteWallTest() {
    testWall = wallRepository.save(testWall);

    ResponseEntity<?> response = wallController.deleteWall(authentication, testWall.getId());

    int walls = wallRepository.findAll().size();

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(0, walls));
  }

  @Test
  @WithMockUser
  void unauthorizedEditorTest() {
    testUser.setId(UUID.randomUUID().toString());

    ResponseEntity<?> responseCreate = wallController.createWall(authentication, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(BodyUtils.error("Not an editor."), responseCreate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.UNAUTHORIZED, responseCreate.getStatusCode()));

    testWall = wallRepository.save(testWall);
    testWall.setName("YEET");

    ResponseEntity<?> responseUpdate = wallController.updateWall(authentication, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error updating wall."), responseUpdate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseUpdate.getStatusCode()));

    ResponseEntity<?> responseDelete = wallController.deleteWall(authentication, testWall.getId());

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                BodyUtils.error("Error deleting wall."), responseDelete.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseDelete.getStatusCode()));
  }

  @Test
  void getWallsTest() {
    testWall = wallRepository.save(testWall);

    ResponseEntity<Page<Wall>> response =
        wallController.getWalls(authentication, testGym.getId(), "", null, null, null);

    Assertions.assertAll(
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(1, response.getBody().getTotalElements()),
        () -> Assertions.assertEquals(1, response.getBody().getNumberOfElements()),
        () -> Assertions.assertEquals(1, response.getBody().getTotalPages()),
        () -> Assertions.assertEquals(1, response.getBody().getContent().size()));
  }
}
