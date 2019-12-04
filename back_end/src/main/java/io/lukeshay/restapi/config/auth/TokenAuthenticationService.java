package io.lukeshay.restapi.config.security;

import com.google.common.collect.ImmutableMap;
import io.lukeshay.restapi.user.User;
import io.lukeshay.restapi.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor(access = PACKAGE)
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class TokenAuthenticationService implements UserAuthenticationService {
  @NonNull
  TokenService tokens;
  @NonNull
  UserRepository userRepository;

  @Override
  public Optional<String> login(final String username, final String password) {
    return userRepository.findByUsername(username)
            .filter(user -> Objects.equals(password, user.getPassword()))
            .map(user -> tokens.expiring(ImmutableMap.of("username", username)));
  }

  @Override
  public Optional<User> findByToken(final String token) {
    return Optional.of(tokens.verify(token))
      .map(map -> map.get("username"))
      .flatMap(userRepository::findByUsername);
  }

  @Override
  public void logout(final User user) {
    // Nothing to doy
  }
}