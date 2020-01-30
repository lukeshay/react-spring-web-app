package com.lukeshay.restapi.session;

import io.jsonwebtoken.Claims;

public interface SessionService {

  Session createSession(
      String jwtToken,
      Claims jwtClaims,
      Long expiresIn,
      String refreshToken,
      Claims refreshClaims,
      String userId);

  Session saveSession(Session session);

  void deleteSession(Session session);
}
