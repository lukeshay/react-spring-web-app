package com.lukeshay.restapi.security;

public class SecurityProperties {

  // Token variables
  public static final String TOKEN_PREFIX = "Bearer ";

  // Token variables - JWT
  public static final String JWT_SECRET = System.getenv("JWT_SECRET");
  public static final Long JWT_EXPIRATION_TIME = 86_400L; // 1 day
  public static final String JWT_HEADER_STRING = "Authorization";

  // Token variables - Refresh
  public static final String REFRESH_SECRET = System.getenv("REFRESH_SECRET");
  public static final Long REFRESH_EXPIRATION_TIME = 864_000_000L; // 10 days
  public static final String REFRESH_HEADER_STRING = "Refresh";

  // Token variables - Remember
  public static final Long REMEMBER_EXPIRATION_TIME = 864_000_000L; // 10 days

  // Claim variables
  public static final String JWT_HEADER_PARAM = "typ";
  public static final String ISSUER = "route-rating-rest-api";
}
