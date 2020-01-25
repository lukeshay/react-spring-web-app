package com.lukeshay.restapi.config.security;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lukeshay.restapi.jwt.JwtService;
import com.lukeshay.restapi.session.Session;
import com.lukeshay.restapi.session.SessionService;
import io.jsonwebtoken.Claims;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private AuthenticationManager authenticationManager;

  private JwtService jwtService;
  private SessionService sessionService;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  @Override
  public Authentication attemptAuthentication(
      HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

    Credentials credentials = null;

    try {
      credentials = new ObjectMapper().readValue(request.getInputStream(), Credentials.class);
    } catch (IOException e) {
      e.printStackTrace();
    }

    assert credentials != null;

    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(
            credentials.getUsername(), credentials.getPassword(), new ArrayList<>());

    return authenticationManager.authenticate(authenticationToken);
  }

  @Override
  protected void successfulAuthentication(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain,
      Authentication authResult)
      throws IOException {

    if (jwtService == null) {
      ServletContext servletContext = request.getServletContext();
      WebApplicationContext webApplicationContext =
          WebApplicationContextUtils.getWebApplicationContext(servletContext);

      jwtService = webApplicationContext.getBean(JwtService.class);
      sessionService = webApplicationContext.getBean(SessionService.class);
    }

    MyUserDetails principal = (MyUserDetails) authResult.getPrincipal();

    String token =
        JWT.create()
            .withSubject(principal.getUser().getId())
            .withExpiresAt(
                new Date(System.currentTimeMillis() + SecurityProperties.EXPIRATION_TIME))
            .sign(HMAC512(SecurityProperties.SECRET.getBytes()));

    Claims claims = jwtService.buildClaims(principal.getUser());
    String tokenV2 = jwtService.buildJwt(claims);

    Session session =
        sessionService.createSession(
            tokenV2,
            claims,
            JwtService.getExpirationInMinutes(claims),
            "",
            principal.getUser().getId());
    //    sessionService.saveSession(session);

    response.addHeader(SecurityProperties.HEADER_STRING, SecurityProperties.TOKEN_PREFIX + token);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    response
        .getWriter()
        .write(
            new AuthBody(SecurityProperties.TOKEN_PREFIX + token, principal.getUser(), session)
                .toString());
  }
}
