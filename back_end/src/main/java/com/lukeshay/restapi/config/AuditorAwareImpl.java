package com.lukeshay.restapi.config;

import com.lukeshay.restapi.security.UserPrincipal;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorAwareImpl implements AuditorAware<String> {

  @Override
  public Optional<String> getCurrentAuditor() {
    String userId = "";

    try {
      userId =
          ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
              .getUser()
              .getId()
              .toString();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return Optional.of(userId);
  }
}
