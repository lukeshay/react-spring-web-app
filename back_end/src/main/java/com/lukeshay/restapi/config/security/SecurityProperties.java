package com.lukeshay.restapi.config.security;

public class SecurityProperties {

  public static final String SECRET = System.getenv("JWT_SECRET");
  public static final Long EXPIRATION_TIME = 86_400L; // 1 day
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";

  public static final String JWT_HEADER_PARAM = "typ";
}
