package com.lukeshay.restapi.jwt;

import com.lukeshay.restapi.TestBase;
import com.lukeshay.restapi.security.SecurityProperties;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class JwtServiceTest extends TestBase {

  @Autowired private JwtService jwtService;

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
  }

  @Test
  void methodsTest() {
    Claims parsedJwtClaims = jwtService.parseJwtToken(jwtToken);
    Claims parsedRefreshClaims = jwtService.parseJwtToken(refreshToken);

    Assertions.assertAll(
        () -> Assertions.assertEquals(testUser.getId(), jwtClaims.getId()),
        () -> Assertions.assertEquals(SecurityProperties.JWT_HEADER_STRING, jwtClaims.getSubject()),
        () -> Assertions.assertEquals(SecurityProperties.ISSUER, jwtClaims.getIssuer()),
        () -> Assertions.assertEquals(testUser.getId(), refreshClaims.getId()),
        () ->
            Assertions.assertEquals(
                SecurityProperties.REFRESH_HEADER_STRING, refreshClaims.getSubject()),
        () -> Assertions.assertEquals(SecurityProperties.ISSUER, refreshClaims.getIssuer()),
        () -> Assertions.assertEquals(1440L, expiresIn),
        () -> Assertions.assertEquals(jwtClaims.getSubject(), parsedJwtClaims.getSubject()),
        () -> Assertions.assertEquals(jwtClaims.getId(), parsedJwtClaims.getId()),
        () -> Assertions.assertEquals(jwtClaims.getIssuedAt(), parsedJwtClaims.getIssuedAt()),
        () -> Assertions.assertEquals(jwtClaims.getExpiration(), parsedJwtClaims.getExpiration()),
        () -> Assertions.assertEquals(jwtClaims.getIssuer(), parsedJwtClaims.getIssuer()),
        () -> Assertions.assertEquals(refreshClaims.getSubject(), parsedRefreshClaims.getSubject()),
        () -> Assertions.assertEquals(refreshClaims.getId(), parsedRefreshClaims.getId()),
        () ->
            Assertions.assertEquals(refreshClaims.getIssuedAt(), parsedRefreshClaims.getIssuedAt()),
        () ->
            Assertions.assertEquals(
                refreshClaims.getExpiration(), parsedRefreshClaims.getExpiration()),
        () -> Assertions.assertEquals(refreshClaims.getIssuer(), parsedRefreshClaims.getIssuer()));
  }

  @Test
  void routeRatingJwtTest() {
    Assertions.assertAll(
        () -> Assertions.assertEquals(expiresIn, testRouteRatingJwt.getExpiresIn()),
        () ->
            Assertions.assertEquals(
                jwtClaims.getSubject(), testRouteRatingJwt.getJwtClaims().getSubject()),
        () -> Assertions.assertEquals(jwtClaims.getId(), testRouteRatingJwt.getJwtClaims().getId()),
        () ->
            Assertions.assertEquals(
                jwtClaims.getIssuedAt(), testRouteRatingJwt.getJwtClaims().getIssuedAt()),
        () ->
            Assertions.assertEquals(
                jwtClaims.getExpiration(), testRouteRatingJwt.getJwtClaims().getExpiration()),
        () ->
            Assertions.assertEquals(
                jwtClaims.getIssuer(), testRouteRatingJwt.getJwtClaims().getIssuer()),
        () ->
            Assertions.assertEquals(
                SecurityProperties.TOKEN_PREFIX + jwtToken, testRouteRatingJwt.getJwtToken()),
        () ->
            Assertions.assertEquals(
                refreshClaims.getSubject(), testRouteRatingJwt.getRefreshClaims().getSubject()),
        () ->
            Assertions.assertEquals(
                refreshClaims.getId(), testRouteRatingJwt.getRefreshClaims().getId()),
        () ->
            Assertions.assertEquals(
                refreshClaims.getIssuedAt(), testRouteRatingJwt.getRefreshClaims().getIssuedAt()),
        () ->
            Assertions.assertEquals(
                refreshClaims.getExpiration(),
                testRouteRatingJwt.getRefreshClaims().getExpiration()),
        () ->
            Assertions.assertEquals(
                refreshClaims.getIssuer(), testRouteRatingJwt.getRefreshClaims().getIssuer()),
        () ->
            Assertions.assertEquals(
                SecurityProperties.TOKEN_PREFIX + refreshToken,
                testRouteRatingJwt.getRefreshToken()));
  }
}
