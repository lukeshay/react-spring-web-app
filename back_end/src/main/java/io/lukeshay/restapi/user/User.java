package io.lukeshay.restapi.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The type User.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User implements Persistable<String> {

  @Id
  private String userId;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String createdDate;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String modifiedDate;

  @JsonProperty(access = Access.WRITE_ONLY)
  private String password;

  @JsonProperty(access = Access.WRITE_ONLY)
  private boolean persistable;

  @Indexed(unique = true)
  private String username;

  @Indexed(unique = true)
  private String email;

  private String firstName;
  private String lastName;
  private String phoneNumber;
  private String state;
  private String country;
  private List<String> authorities;

  User(String username, String firstName, String lastName, String email, String phoneNumber,
      String state, String country, String password) {
    this.username = username;
    this.firstName = firstName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.state = state;
    this.country = country;
    this.password = password;
  }

  /**
   * Returns the id of the entity.
   *
   * @return the id. Can be {@literal null}.
   */
  @Override
  public String getId() {
    return userId;
  }

  /**
   * Returns if the {@code Persistable} is new or was persisted already.
   *
   * @return if {@literal true} the object is new.
   */
  @Override
  public boolean isNew() {
    return !persistable;
  }
}
