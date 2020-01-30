package com.lukeshay.restapi.session;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.jwt.RouteRatingJwt;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.ModelUtils;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "sessions")
public class Session extends Auditable<String> {
  @Column(name = "id", unique = true, updatable = false)
  @Expose
  @GeneratedValue(generator = "pg-uuid")
  @GenericGenerator(name = "pg-uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @Id
  private String id;

  @Column(name = "tokens")
  @Expose
  @Transient
  private RouteRatingJwt tokens;

  @Column(name = "user_id", unique = true, updatable = false)
  @Expose
  private String userId;;

  @Column(name = "active")
  @JsonProperty(access = Access.WRITE_ONLY)
  private Boolean active;

  public Session() {}

  public Session(RouteRatingJwt tokens, String userId) {
    this.tokens = tokens;
    this.userId = userId;
    active = true;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public RouteRatingJwt getTokens() {
    return tokens;
  }

  public void setTokens(RouteRatingJwt tokens) {
    this.tokens = tokens;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }

  @Override
  public boolean equals(Object obj) {
    return ModelUtils.equals(this, obj);
  }
}
