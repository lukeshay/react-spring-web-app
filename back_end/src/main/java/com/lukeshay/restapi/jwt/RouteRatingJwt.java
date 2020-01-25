package com.lukeshay.restapi.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Models;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RouteRatingJwt {
  @Expose private String jwt;

  @JsonProperty(access = Access.WRITE_ONLY)
  private Claims claims;

  @Expose private Long expiresIn;
  @Expose private String refreshToken;

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
