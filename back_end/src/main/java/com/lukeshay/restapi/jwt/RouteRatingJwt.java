package com.lukeshay.restapi.jwt;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RouteRatingJwt {
  private String jwt;
  private Claims claims;
}
