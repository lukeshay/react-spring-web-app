package com.lukeshay.restapi.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.ModelUtils;
import io.jsonwebtoken.Claims;

public class RouteRatingJwt {
  @Expose private String jwtToken;

  @JsonProperty(access = Access.WRITE_ONLY)
  private Claims jwtClaims;

  @Expose private Long expiresIn;
  @Expose private String refreshToken;

  @JsonProperty(access = Access.WRITE_ONLY)
  private Claims refreshClaims;

  public RouteRatingJwt(
      String jwtToken,
      Claims jwtClaims,
      Long expiresIn,
      String refreshToken,
      Claims refreshClaims) {
    this.jwtToken = jwtToken;
    this.jwtClaims = jwtClaims;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.refreshClaims = refreshClaims;
  }

  public String getJwtToken() {
    return jwtToken;
  }

  public Claims getJwtClaims() {
    return jwtClaims;
  }

  public Long getExpiresIn() {
    return expiresIn;
  }

  public String getRefreshToken() {
    return refreshToken;
  }

  public Claims getRefreshClaims() {
    return refreshClaims;
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }

  @Override
  public boolean equals(Object obj) {
    return ModelUtils.equals(this, obj);
  }
}
