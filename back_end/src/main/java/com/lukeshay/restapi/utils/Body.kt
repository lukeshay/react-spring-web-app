package com.lukeshay.restapi.utils

import com.google.gson.Gson

object Body {
    @JvmStatic
    fun error(message: String?): String {
        val errorBody = ErrorBody(message)
        return errorBody.toString()
    }

    internal class ErrorBody(var error: String?) {
        override fun toString(): String {
            return Gson().toJson(this)
        }
    }
}