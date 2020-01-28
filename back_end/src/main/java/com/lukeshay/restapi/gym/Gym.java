package com.lukeshay.restapi.gym;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.Models;
import java.util.List;
import java.util.UUID;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** The type Gym. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Gym extends Auditable<String> {
  @Id @GeneratedValue @Expose private String id;

  @Expose private String name;
  @Expose private String address;
  @Expose private String city;
  @Expose private String state;
  @Expose private String zipCode;
  @Expose private String website;
  @Expose private String email;
  @Expose private String phoneNumber;
  @Expose private String logoUrl;
  @Expose private String photoUrl;

  @ElementCollection @Expose private List<String> authorizedEditors;

  public Gym(
      String name,
      String address,
      String city,
      String state,
      String zipCode,
      String website,
      String email,
      String phoneNumber,
      List<String> authorizedEditors) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.website = website;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.authorizedEditors = authorizedEditors;
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof Gym && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return Models.toString(this);
  }
}
