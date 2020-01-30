package com.lukeshay.restapi.rating.route;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import com.lukeshay.restapi.utils.Models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
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
@Table(name = "route_rating")
public class RouteRating { // extends Auditable<String> {
  @Column(name = "id", unique = true, updatable = false)
  @Expose
  @GeneratedValue(generator = "pg-uuid")
  @GenericGenerator(name = "pg-uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @Id
  private String id;

  @Column(name = "creator_id")
  @Expose
  private String creatorId;

  @Column(name = "creator_username")
  @Expose
  private String creatorUsername;

  @Column(name = "route_id")
  @Expose
  private String routeId;

  @Column(name = "review")
  @Expose
  private String review;

  @Column(name = "grade")
  @Expose
  private Grade grade;

  @Column(name = "rating")
  @Expose
  private int rating;

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
