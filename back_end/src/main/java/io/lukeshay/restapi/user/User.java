package io.lukeshay.restapi.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The type User.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
	@Id
	private String userId;
	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	private String phoneNumber;
	private String state;
	private String country;

	@CreatedDate
	private String createdDate;

	@LastModifiedDate
	private String modifiedDate;
}
