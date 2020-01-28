package com.lukeshay.restapi.session;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.jwt.RouteRatingJwt;
import com.lukeshay.restapi.utils.Models;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Session implements Persistable<String> {
  @Id @Expose String id;
  @Expose private RouteRatingJwt tokens;
  @Expose private String userId;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private Instant created;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private Instant modified;

  @JsonProperty(access = Access.WRITE_ONLY)
  private Boolean active;

  @JsonProperty(access = Access.WRITE_ONLY)
  private Boolean persistable;

  public Session(RouteRatingJwt tokens, String userId) {
    this.tokens = tokens;
    this.userId = userId;
    persistable = true;
    active = true;
  }

  public String getId() {
    return id;
  }

  @Override
  public boolean isNew() {
    return !persistable;
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
