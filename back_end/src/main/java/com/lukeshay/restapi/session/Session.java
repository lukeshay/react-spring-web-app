package com.lukeshay.restapi.session;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.jwt.RouteRatingJwt;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.Models;
import java.time.Instant;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Session extends Auditable<String> {
  @Id @GeneratedValue @Expose String id;
  @Transient @Expose private RouteRatingJwt tokens;
  @Expose private String userId;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String created;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String modified;

  @JsonProperty(access = Access.WRITE_ONLY)
  private Boolean active;

  public Session(RouteRatingJwt tokens, String userId) {
    this.tokens = tokens;
    this.userId = userId;
    active = true;
  }

  public String getId() {
    return id;
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
