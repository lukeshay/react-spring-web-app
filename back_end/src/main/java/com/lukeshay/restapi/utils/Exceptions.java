package com.lukeshay.restapi.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class Exceptions {

  public static ResponseStatusException notFound(String message) {
    return responseStatusException(HttpStatus.NOT_FOUND, message);
  }

  public static ResponseStatusException internalServerError(String message) {
    return responseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }

  public static ResponseStatusException badRequest(String message) {
    return responseStatusException(HttpStatus.BAD_REQUEST, message);
  }

  private static ResponseStatusException responseStatusException(HttpStatus httpStatus,
      String message) {
    return new ResponseStatusException(httpStatus, message);
  }
}
