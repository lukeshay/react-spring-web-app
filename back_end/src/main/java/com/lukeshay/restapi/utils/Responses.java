package com.lukeshay.restapi.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class Responses {
  public static <T> ResponseEntity<?> okJsonResponse(T body) {
    return httpJsonResponse(HttpStatus.OK, body);
  }

  public static <T> ResponseEntity<?> notFoundJsonResponse(T body) {
    return httpJsonResponse(HttpStatus.NOT_FOUND, body);
  }

  public static <T> ResponseEntity<?> badRequestJsonResponse(T body) {
    return httpJsonResponse(HttpStatus.BAD_REQUEST, body);
  }

  private static <T> ResponseEntity<?> httpJsonResponse(HttpStatus status, T body) {
    return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(body);
  }
}
