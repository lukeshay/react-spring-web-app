package com.lukeshay.restapi.rating.route;

import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.route.RouteProperties.Grade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class RouteRating {
  @Id @Expose private String id;
  @Expose private String creatorId;
  @Expose private String creatorUsername;
  @CreatedDate @Expose private String createdDate;
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
    return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(this);
  }
}
