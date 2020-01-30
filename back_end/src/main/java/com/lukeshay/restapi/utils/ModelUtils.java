package com.lukeshay.restapi.utils;

import com.google.gson.GsonBuilder;

public class ModelUtils {
  public static <T> String toString(T model) {
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(model);
  }

  public static <T, U> Boolean equals(T modelOne, U modelTwo) {
    return modelOne.getClass().equals(modelTwo.getClass())
        && modelOne.toString().equals(modelTwo.toString());
  }
}
