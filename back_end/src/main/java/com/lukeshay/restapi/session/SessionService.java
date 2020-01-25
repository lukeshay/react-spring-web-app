package com.lukeshay.restapi.session;

import com.lukeshay.restapi.jwt.RouteRatingJwt;
import com.lukeshay.restapi.user.UserRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
  @Autowired private SessionRepository sessionRepository;
  @Autowired private UserRepository userRepository;

  public Session createSession(
      String jwtToken, Claims claims, Long expiresIn, String refreshToken, String userId) {
    return new Session(new RouteRatingJwt(jwtToken, claims, expiresIn, refreshToken), userId);
  }

  public Session saveSession(Session session) {
    return sessionRepository.save(session);
  }
}
