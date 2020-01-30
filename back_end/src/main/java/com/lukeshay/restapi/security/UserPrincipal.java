package com.lukeshay.restapi.security;

import com.lukeshay.restapi.user.User;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails, Principal {

  private User user;

  public UserPrincipal(User user) {
    this.user = user;
  }

  @Override
  public Collection<GrantedAuthority> getAuthorities() {
    String role = user.getRole();
    if (role == null) {
      role = "BASIC_ROLE";
    }

    String authority = user.getAuthority();
    if (authority == null) {
      authority = "BASIC";
    }

    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(authority));
    authorities.add(new SimpleGrantedAuthority(role));
    return authorities;
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  public User getUser() {
    return user;
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String getName() {
    return user.getFirstName() + " " + user.getLastName();
  }
}
