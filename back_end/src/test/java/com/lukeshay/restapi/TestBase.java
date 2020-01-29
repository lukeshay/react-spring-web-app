package com.lukeshay.restapi;

import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.rating.route.RouteRatingRepository;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.security.UserPrincipal;
import com.lukeshay.restapi.services.AwsService;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserRepository;
import com.lukeshay.restapi.user.UserTypes;
import com.lukeshay.restapi.wall.WallRepository;
import java.util.Collections;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@AutoConfigureDataMongo
public class TestBase {
  @Autowired protected GymRepository gymRepository;
  @Autowired protected RouteRatingRepository routeRatingRepository;
  @Autowired protected RouteRepository routeRepository;
  @Autowired protected UserRepository userRepository;
  @Autowired protected WallRepository wallRepository;
  @Autowired protected PasswordEncoder passwordEncoder;

  protected User testUser;
  protected UserPrincipal testUserPrincipal;
  protected Authentication authentication;

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
            "Iowa",
            "USA",
            "password");

    testUser.setAuthorities(Collections.singletonList(UserTypes.BASIC.authority()));
    testUser.setRoles(Collections.singletonList(UserTypes.BASIC.role()));

    testUser = userRepository.save(testUser);

    testUserPrincipal = new UserPrincipal(testUser);

    authentication =
        new UsernamePasswordAuthenticationToken(
            testUserPrincipal, null, testUserPrincipal.getAuthorities());
  }

  @AfterEach
  protected void tearDownClasses() {
    gymRepository.deleteAll();
    routeRatingRepository.deleteAll();
    routeRepository.deleteAll();
    userRepository.deleteAll();
    wallRepository.deleteAll();
  }
}
