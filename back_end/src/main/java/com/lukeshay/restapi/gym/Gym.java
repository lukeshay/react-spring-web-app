package com.lukeshay.restapi.gym;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.ModelUtils;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

/** The type Gym. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gym")
public class Gym { // extends Auditable<String> {
  @Column(name = "id", unique = true, updatable = false)
  @Expose
  @GeneratedValue(generator = "pg-uuid")
  @GenericGenerator(name = "pg-uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @Id
  private String id;

  @Column(name = "name")
  @Expose
  private String name;

  @Column(name = "address")
  @Expose
  private String address;

  @Column(name = "city")
  @Expose
  private String city;

  @Column(name = "state")
  @Expose
  private String state;

  @Column(name = "zip_code")
  @Expose
  private String zipCode;

  @Column(name = "website")
  @Expose
  private String website;

  @Column(name = "email")
  @Expose
  private String email;

  @Column(name = "phone_number")
  @Expose
  private String phoneNumber;

  @Column(name = "logo_url")
  @Expose
  private String logoUrl;

  @Column(name = "photo_url")
  @Expose
  private String photoUrl;

  @Column(name = "authorized_editors")
  @ElementCollection(fetch = FetchType.EAGER)
  @Expose
  private List<String> authorizedEditors;

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
    return ModelUtils.equals(this, obj);
  }

  @Override
  public String toString() {
    return ModelUtils.toString(this);
  }
}
