package com.lukeshay.restapi.jwt;

import com.lukeshay.restapi.config.security.SecurityProperties;
import com.lukeshay.restapi.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private JwtParser jwtParser;
  private SecretKey secretKey;

  @PostConstruct
  private void setSigner() {
    byte[] secret = Base64.getMimeDecoder().decode(SecurityProperties.SECRET);

    jwtParser = Jwts.parser().setSigningKey(secret);
    secretKey = Keys.hmacShaKeyFor(secret);
  }

  public String buildJwt(Claims claims) {
    return Jwts.builder()
        .signWith(secretKey)
        .setHeaderParam(SecurityProperties.JWT_HEADER_PARAM, "JWT")
        .setClaims(claims)
        .compact();
  }

  public Claims buildClaims(User user) {
    Instant now = Instant.now();
    Claims claims = Jwts.claims();

    claims
        .setExpiration(Date.from(now.plusSeconds(SecurityProperties.EXPIRATION_TIME)))
        .setIssuedAt(Date.from(now))
        .setSubject(user.toString())
        .setId(user.getId());

    return claims;
  }

  public static Long getExpirationInMinutes(Claims claims) {
    return (claims.getExpiration().getTime() - claims.getIssuedAt().getTime()) / 60000;
  }
}
