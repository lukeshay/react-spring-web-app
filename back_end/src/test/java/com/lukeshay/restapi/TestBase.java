package com.lukeshay.restapi;

import com.lukeshay.restapi.aws.AwsService;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.rating.route.RouteRatingRepository;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.security.UserPrincipal;
import com.lukeshay.restapi.session.SessionRepository;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserRepository;
import com.lukeshay.restapi.user.UserTypes;
import com.lukeshay.restapi.wall.WallRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class TestBase {
  @Autowired protected GymRepository gymRepository;
  @Autowired protected RouteRatingRepository routeRatingRepository;
  @Autowired protected RouteRepository routeRepository;
  @Autowired protected SessionRepository sessionRepository;
  @Autowired protected UserRepository userRepository;
  @Autowired protected WallRepository wallRepository;
  @Autowired protected PasswordEncoder passwordEncoder;

  protected User testUser;
  protected UserPrincipal testUserPrincipal;

  @Mock protected Authentication authentication;
  @Mock protected AwsService awsService;

  @BeforeEach
  protected void setUpClasses() {
    MockitoAnnotations.initMocks(this);

    testUser =
        new User(
            "test.user@email.com",
            "Test",
            "User",
            "test.user@email.com",
            "1111111111",
            "Des Moines",
            "Iowa",
            "USA",
            "password");

    testUser.setAuthority(UserTypes.BASIC.authority());
    testUser.setRole(UserTypes.BASIC.role());

    testUser = userRepository.save(testUser);

    testUserPrincipal = new UserPrincipal(testUser);

    Mockito.when(authentication.getPrincipal()).thenReturn(testUserPrincipal);
    Mockito.when(awsService.uploadFileToS3(Mockito.anyString(), Mockito.any(MultipartFile.class)))
        .thenReturn("url.com");
  }

  @AfterEach
  protected void tearDownClasses() {
    gymRepository.deleteAll();
    routeRatingRepository.deleteAll();
    routeRepository.deleteAll();
    sessionRepository.deleteAll();
    userRepository.deleteAll();
    wallRepository.deleteAll();
  }
}
