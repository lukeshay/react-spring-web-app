package com.lukeshay.restapi.utils

import com.google.gson.GsonBuilder

object Models {
    @JvmStatic
    fun <T> toString(model: T): String = GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(model)
}