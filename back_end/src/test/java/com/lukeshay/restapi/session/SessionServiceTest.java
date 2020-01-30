package com.lukeshay.restapi.session;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.jwt.JwtService;
import com.lukeshay.restapi.jwt.RouteRatingJwt;
import com.lukeshay.restapi.security.SecurityProperties;
import io.jsonwebtoken.Claims;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionServiceTest extends TestBase {

  @Autowired private JwtService jwtService;

  @Autowired private SessionService sessionService;

  private Session testSession;
  private RouteRatingJwt testRouteRatingJwt;
  private Claims jwtClaims;
  private Claims refreshClaims;
  private String jwtToken;
  private String refreshToken;
  private Long expiresIn;

  @BeforeEach
  void setUp() {
    jwtClaims = jwtService.buildJwtClaims(testUser);
    refreshClaims = jwtService.buildRefreshClaims(testUser);

    jwtToken = jwtService.buildToken(jwtClaims);
    refreshToken = jwtService.buildToken(refreshClaims);

    expiresIn = JwtService.getExpirationInMinutes(jwtClaims);

    testRouteRatingJwt =
        new RouteRatingJwt(
            SecurityProperties.TOKEN_PREFIX + jwtToken,
            jwtClaims,
            expiresIn,
            SecurityProperties.TOKEN_PREFIX + refreshToken,
            refreshClaims);

    testSession = new Session(testRouteRatingJwt, testUser.getId());
  }

  @Test
  void createSessionTest() {
    String userId = UUID.randomUUID().toString();

    Session testSessionTwo =
        sessionService.createSession(
            SecurityProperties.TOKEN_PREFIX + jwtToken,
            jwtClaims,
            expiresIn,
            SecurityProperties.TOKEN_PREFIX + refreshToken,
            refreshClaims,
            userId);

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                SecurityProperties.TOKEN_PREFIX + jwtToken,
                testSessionTwo.getTokens().getJwtToken()),
        () -> Assertions.assertEquals(jwtClaims, testSessionTwo.getTokens().getJwtClaims()),
        () -> Assertions.assertEquals(expiresIn, testSessionTwo.getTokens().getExpiresIn()),
        () ->
            Assertions.assertEquals(
                SecurityProperties.TOKEN_PREFIX + refreshToken,
                testSessionTwo.getTokens().getRefreshToken()),
        () -> Assertions.assertEquals(refreshClaims, testSessionTwo.getTokens().getRefreshClaims()),
        () -> Assertions.assertEquals(userId, testSessionTwo.getUserId()));
  }

  @Test
  void saveSessionTest() {
    Session savedTestSession = sessionService.saveSession(testSession);

    testSession = sessionRepository.findById(savedTestSession.getId()).get();

    Assertions.assertAll(
        () ->
            Assertions.assertEquals(
                SecurityProperties.TOKEN_PREFIX + jwtToken,
                savedTestSession.getTokens().getJwtToken()),
        () -> Assertions.assertEquals(expiresIn, savedTestSession.getTokens().getExpiresIn()),
        () ->
            Assertions.assertEquals(
                SecurityProperties.TOKEN_PREFIX + refreshToken,
                savedTestSession.getTokens().getRefreshToken()),
        () -> Assertions.assertEquals(testUser.getId(), savedTestSession.getUserId()));

    savedTestSession.setTokens(null);

    Assertions.assertEquals(testSession, savedTestSession);
  }
}
