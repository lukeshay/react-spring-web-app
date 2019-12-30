package com.lukeshay.restapi.utils;

import com.google.gson.Gson;

public class Bodys {
  static class ErrorBody {
    String error;

    ErrorBody(String error) {
      this.error = error;
    }

    @Override
    public String toString() {
      return new Gson().toJson(this);
    }
  }

  public static String error(String message) {
    ErrorBody errorBody = new ErrorBody(message);
    return errorBody.toString();
  }
}
