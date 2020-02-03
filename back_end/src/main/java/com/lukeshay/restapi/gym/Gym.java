package com.lukeshay.restapi.gym;

import com.google.gson.annotations.Expose;
import com.lukeshay.restapi.utils.Auditable;
import com.lukeshay.restapi.utils.ModelUtils;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

/** The type Gym. */
@Entity
@Table(name = "gyms")
public class Gym extends Auditable<String> {
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

  public Gym() {}

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

  public Gym(
      String id,
      String name,
      String address,
      String city,
      String state,
      String zipCode,
      String website,
      String email,
      String phoneNumber,
      String logoUrl,
      String photoUrl,
      List<String> authorizedEditors) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.website = website;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.logoUrl = logoUrl;
    this.photoUrl = photoUrl;
    this.authorizedEditors = authorizedEditors;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getZipCode() {
    return zipCode;
  }

  public void setZipCode(String zipCode) {
    this.zipCode = zipCode;
  }

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getLogoUrl() {
    return logoUrl;
  }

  public void setLogoUrl(String logoUrl) {
    this.logoUrl = logoUrl;
  }

  public String getPhotoUrl() {
    return photoUrl;
  }

  public void setPhotoUrl(String photoUrl) {
    this.photoUrl = photoUrl;
  }

  public List<String> getAuthorizedEditors() {
    return authorizedEditors;
  }

  public void setAuthorizedEditors(List<String> authorizedEditors) {
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
