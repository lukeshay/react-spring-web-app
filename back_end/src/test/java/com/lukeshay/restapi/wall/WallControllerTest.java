package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserTypes;
import com.lukeshay.restapi.utils.Body;
import com.lukeshay.restapi.wall.WallProperties.WallTypes;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.AfterEach;
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
public class WallControllerTest {

  private WallController wallController;

  @Autowired private GymRepository gymRepository;

  @Autowired private WallRepository wallRepository;

  @Mock private HttpServletRequest request;

  @Mock private Requests requests;

  private Gym testGym;

  private Wall testWall;

  private User testUser;

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

    testUser.setUserId("1111111111");
    testUser.setAuthorities(Collections.singletonList(UserTypes.BASIC.authority()));

    Mockito.when(requests.getUserFromRequest(request)).thenReturn(testUser);

    wallController = new WallController(new WallService(wallRepository, gymRepository, requests));

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
    ResponseEntity<?> response = wallController.createWall(request, testWall);

    testWall = wallRepository.findAll().get(0);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()));

    ResponseEntity<?> responseWithId = wallController.createWall(request, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Error adding wall."), responseWithId.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseWithId.getStatusCode()));

    testWall.setId("");
    testWall.setGymId("asdf");

    ResponseEntity<?> responseInvalidGymId = wallController.createWall(request, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                Body.error("Error adding wall."), responseInvalidGymId.getBody()),
        () ->
            Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseInvalidGymId.getStatusCode()));
  }

  @Test
  @WithMockUser
  void updateWallTest() {
    testWall = wallRepository.save(testWall);
    testWall.setName("YEET");

    ResponseEntity<?> responseUpdate = wallController.updateWall(request, testWall);

    testWall.setPersistable(true);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, responseUpdate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, responseUpdate.getStatusCode()));

    ResponseEntity<?> responseNoUpdate = wallController.updateWall(request, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, responseNoUpdate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, responseNoUpdate.getStatusCode()));

    String wallId = testWall.getId();

    testWall.setId(null);

    ResponseEntity<?> responseNoWallId = wallController.updateWall(request, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(Body.error("Error updating wall."), responseNoWallId.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoWallId.getStatusCode()));

    testWall.setId(wallId);
    testWall.setGymId(null);

    ResponseEntity<?> responseNoGymId = wallController.updateWall(request, testWall);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(Body.error("Error updating wall."), responseNoGymId.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseNoGymId.getStatusCode()));
  }

  @Test
  @WithMockUser
  void deleteWallTest() {
    testWall = wallRepository.save(testWall);

    ResponseEntity<?> response = wallController.deleteWall(request, testWall.getId());

    int walls = wallRepository.findAll().size();

    Assertions.assertAll(
        () -> Assertions.assertEquals(testWall, response.getBody()),
        () -> Assertions.assertEquals(HttpStatus.OK, response.getStatusCode()),
        () -> Assertions.assertEquals(0, walls));
  }

  @Test
  @WithMockUser
  void unauthorizedEditorTest() {
    testUser.setUserId("00000000");

    ResponseEntity<?> responseCreate = wallController.createWall(request, testWall);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Error adding wall."), responseCreate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseCreate.getStatusCode()));

    testWall = wallRepository.save(testWall);
    testWall.setName("YEET");

    ResponseEntity<?> responseUpdate = wallController.updateWall(request, testWall);

    testWall.setPersistable(true);

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Error updating wall."), responseUpdate.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseUpdate.getStatusCode()));

    ResponseEntity<?> responseDelete = wallController.deleteWall(request, testWall.getId());

    Assertions.assertAll(
        () -> Assertions.assertEquals(Body.error("Error deleting wall."), responseDelete.getBody()),
        () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseDelete.getStatusCode()));
  }

  @Test
  void getWallsTest() {
    testWall = wallRepository.save(testWall);

    List<Wall> walls = wallController.getWalls(request, testGym.getId()).getBody();

    Assertions.assertIterableEquals(walls, Collections.singletonList(testWall));
  }
}
