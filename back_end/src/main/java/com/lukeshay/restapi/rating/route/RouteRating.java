package com.lukeshay.restapi.rating;

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
public class Rating {
  @Id @Expose private String id;
  @CreatedDate @Expose private String createdDate;
  @Expose private String routeId;
  @Expose private String wallId;
  @Expose private String gymId;
  @Expose private String review;
  @Expose private Grade grade;
  @Expose private int rating;

  public Rating(
      String createdDate,
      String routeId,
      String wallId,
      String gymId,
      String review,
      Grade grade,
      int rating) {
    this.createdDate = createdDate;
    this.routeId = routeId;
    this.wallId = wallId;
    this.gymId = gymId;
    this.review = review;
    this.grade = grade;
    this.rating = rating;
  }
}
