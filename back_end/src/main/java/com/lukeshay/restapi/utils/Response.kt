package com.lukeshay.restapi.utils

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

object Response {
    @JvmStatic
    fun <T> ok(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.OK, body)
    }

    @JvmStatic
    fun <T> notFound(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.NOT_FOUND, body)
    }

    @JvmStatic
    fun <T> badRequest(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.BAD_REQUEST, body)
    }

    @JvmStatic
    fun <T> unauthorized(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.UNAUTHORIZED, body)
    }

    @JvmStatic
    fun <T> internalServerError(body: T): ResponseEntity<*> {
        return httpJsonResponse(HttpStatus.INTERNAL_SERVER_ERROR, body)
    }

    @JvmStatic
    private fun <T> httpJsonResponse(status: HttpStatus, body: T): ResponseEntity<*> {
        return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(body)
    }
}