package com.lukeshay.restapi.rating.route;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.Models;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RouteRating extends Auditable<String> {
  @Id @GeneratedValue @Expose private String id;
  @Expose private String creatorId;
  @Expose private String creatorUsername;
  @Expose private String routeId;
  @Expose private String review;
  @Expose private Grade grade;
  @Expose private int rating;

  public RouteRating(String routeId, String review, Grade grade, int rating) {
    this.routeId = routeId;
    this.review = review;
    this.grade = grade;
    this.rating = rating;
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof RouteRating && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
