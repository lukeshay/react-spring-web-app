package com.lukeshay.restapi.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ResponseUtils {
  public static <T> ResponseEntity<?> ok(T body) {
    return httpJsonResponse(HttpStatus.OK, body);
  }

  public static <T> ResponseEntity<T> okOfType(T body) {
    return httpJsonResponseOfType(HttpStatus.OK, body);
  }

  public static <T> ResponseEntity<?> notFound(T body) {
    return httpJsonResponse(HttpStatus.NOT_FOUND, body);
  }

  public static <T> ResponseEntity<?> badRequest(T body) {
    return httpJsonResponse(HttpStatus.BAD_REQUEST, body);
  }

  public static <T> ResponseEntity<?> unauthorized(T body) {
    return httpJsonResponse(HttpStatus.UNAUTHORIZED, body);
  }

  public static <T> ResponseEntity<?> internalServerError(T body) {
    return httpJsonResponse(HttpStatus.INTERNAL_SERVER_ERROR, body);
  }

  private static <T> ResponseEntity<?> httpJsonResponse(HttpStatus status, T body) {
    return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(body);
  }

  private static <T> ResponseEntity<T> httpJsonResponseOfType(HttpStatus status, T body) {
    return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(body);
  }
}
