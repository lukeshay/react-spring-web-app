package com.lukeshay.restapi.config;

import com.lukeshay.restapi.utils.AuthenticationUtils;
import java.util.Optional;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorAwareImpl implements AuditorAware<String> {

  @NotNull
  @Override
  public Optional<String> getCurrentAuditor() {
    String userId = "";

    try {
      userId =
          AuthenticationUtils.getUser(SecurityContextHolder.getContext().getAuthentication())
              .getId()
              .toString();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return Optional.of(userId);
  }
}
