package com.lukeshay.restapi.session;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.jwt.RouteRatingJwt;
import com.lukeshay.restapi.utils.Models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sessions")
public class Session { // extends Auditable<String> {
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

  public Session(RouteRatingJwt tokens, String userId) {
    this.tokens = tokens;
    this.userId = userId;
    active = true;
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
