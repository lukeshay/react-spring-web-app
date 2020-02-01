package com.lukeshay.restapi.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class ExceptionUtils {
  public static HttpClientErrorException badRequest(String message) {
    return httpClientErrorException(HttpStatus.BAD_REQUEST, message);
  }

  private static HttpClientErrorException httpClientErrorException(
      HttpStatus status, String message) {
    return HttpClientErrorException.create(status, message, HttpHeaders.EMPTY, null, null);
  }
}
