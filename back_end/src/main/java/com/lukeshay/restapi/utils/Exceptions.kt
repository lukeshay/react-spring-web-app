package com.lukeshay.restapi.utils

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object Exceptions {
    @JvmStatic
    fun notFound(message: String): ResponseStatusException {
        return responseStatusException(HttpStatus.NOT_FOUND, message)
    }

    @JvmStatic
    fun internalServerError(message: String): ResponseStatusException {
        return responseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, message)
    }

    @JvmStatic
    fun badRequest(message: String): ResponseStatusException {
        return responseStatusException(HttpStatus.BAD_REQUEST, message)
    }

    private fun responseStatusException(
            httpStatus: HttpStatus, message: String): ResponseStatusException {
        return ResponseStatusException(httpStatus, message)
    }
}