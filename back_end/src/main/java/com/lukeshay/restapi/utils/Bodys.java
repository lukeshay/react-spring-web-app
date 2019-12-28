package com.lukeshay.restapi.utils;

import com.google.gson.Gson;

public class Bodys {
  static class ErrorBody {
    final String error;
    String message;

    ErrorBody() {
      error = "error";
    }

    @Override
    public String toString() {
      return new Gson().toJson(this);
    }
  }

  public static String error(String message) {
    ErrorBody errorBody = new ErrorBody();
    errorBody.message = message;
    return errorBody.toString();
  }
}
