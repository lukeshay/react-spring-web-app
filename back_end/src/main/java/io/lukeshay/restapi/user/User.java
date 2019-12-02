package io.lukeshay.restapi.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;

/**
 * The type User.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Persistable<String> {
	@Id
	private String userId;

	@CreatedDate
	private String createdDate;

	@LastModifiedDate
	private String modifiedDate;

	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	private String phoneNumber;
	private String state;
	private String country;
	private boolean persistable;

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
