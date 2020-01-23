package com.lukeshay.restapi.config.cors

import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import java.io.IOException
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
open class SimpleCORSFilter : Filter {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(req: ServletRequest, res: ServletResponse, chain: FilterChain) {
        val request = req as HttpServletRequest
        val response = res as HttpServletResponse
        LOG.debug(
                "Filtering: method: {}, origin: {}, endpoint: {}, authorization: {}",
                request.method,
                request.getHeader("origin"),
                request.requestURI,
                request.getHeader("Authorization"))
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Credentials", "true")
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS")
        response.setHeader("Access-Control-Max-Age", "3600")
        response.setHeader("Access-Control-Allow-Headers", "*")
        chain.doFilter(req, res)
    }

    companion object {
        private val LOG = LoggerFactory.getLogger(SimpleCORSFilter::class.java.name)
    }
}