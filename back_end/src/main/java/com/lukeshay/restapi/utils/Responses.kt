package com.lukeshay.restapi.utils

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

object Responses {
    @JvmStatic
    fun <T> okJsonResponse(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.OK, body)
    }

    @JvmStatic
    fun <T> notFoundJsonResponse(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.NOT_FOUND, body)
    }

    @JvmStatic
    fun <T> badRequestJsonResponse(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.BAD_REQUEST, body)
    }

    @JvmStatic
    fun <T> unauthorizedJsonResponse(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.UNAUTHORIZED, body)
    }

    @JvmStatic
    fun <T> internalServerErrorResponse(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.INTERNAL_SERVER_ERROR, body)
    }

    @JvmStatic
    private fun <T> httpJsonResponse(status: HttpStatus, body: T): ResponseEntity<*> {
        return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(body)
    }
}