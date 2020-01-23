package com.lukeshay.restapi.config.security

import com.google.gson.annotations.Expose
import com.lukeshay.restapi.user.User
import com.lukeshay.restapi.utils.Models;

class AuthBody(@Expose val Authorization: String, @Expose val user: User) {

    /**
     * Returns a string representation of the object.
     */
    override fun toString(): String {
        return Models.toString(this)
    }
}