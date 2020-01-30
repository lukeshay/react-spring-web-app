package com.lukeshay.restapi.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lukeshay.restapi.jwt.JwtService;
import com.lukeshay.restapi.jwt.JwtServiceImpl;
import com.lukeshay.restapi.session.Session;
import com.lukeshay.restapi.session.SessionService;
import com.lukeshay.restapi.session.SessionServiceImpl;
import com.lukeshay.restapi.user.UserRepository;
import io.jsonwebtoken.Claims;
import java.io.IOException;
import java.util.Collections;
import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private static Logger LOG = LoggerFactory.getLogger(JwtAuthenticationFilter.class.getName());

  private AuthenticationManager authenticationManager;
  private JwtService jwtService;
  private SessionService sessionService;
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

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
            credentials.getUsername(), credentials.getPassword(), Collections.emptyList());

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

      jwtService = webApplicationContext.getBean(JwtServiceImpl.class);
      sessionService = webApplicationContext.getBean(SessionServiceImpl.class);
    }

    UserPrincipal principal = (UserPrincipal) authResult.getPrincipal();

    Claims jwtClaims = jwtService.buildJwtClaims(principal.getUser());
    String jwtToken = jwtService.buildToken(jwtClaims);
    Claims refreshClaims = null;
    String refreshToken = "";

    if (request != null
        && request.getQueryString() != null
        && request.getQueryString().contains("remember=true")) {
      LOG.debug(
          "Creating refresh token for {}",
          ((UserPrincipal) authResult.getPrincipal()).getUser().getId());
      refreshClaims = jwtService.buildRefreshClaims(principal.getUser());
      refreshToken = jwtService.buildToken(refreshClaims);
    }

    Session session =
        sessionService.createSession(
            SecurityProperties.TOKEN_PREFIX + jwtToken,
            jwtClaims,
            JwtService.getExpirationInMinutes(jwtClaims),
            SecurityProperties.TOKEN_PREFIX + refreshToken,
            refreshClaims,
            principal.getUser().getId());
    //    sessionService.saveSession(session);

    response.addHeader(
        SecurityProperties.JWT_HEADER_STRING, SecurityProperties.TOKEN_PREFIX + jwtToken);
    response.addHeader(
        SecurityProperties.REFRESH_HEADER_STRING, SecurityProperties.TOKEN_PREFIX + refreshToken);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    response.getWriter().write(new AuthBody(principal.getUser(), session).toString());
  }
}
