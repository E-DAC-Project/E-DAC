package com.sunbeam.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity // mandatory class level annotation to declare entity class
@Table(name = "new_users") // class level annotation , to specify table name
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = { "password", "confirmPassword"})
public class UserEntity extends BaseEntity implements UserDetails{
	@Column(name = "first_name", length = 30)
	private String firstName;
	@Column(name = "last_name", length = 35)
	private String lastName;
	@Column(length = 30, unique = true) // adds unique constraint
	private String email;
	@Column(length = 300, nullable = false) // not null constraint
	private String password;
	@Transient // to skip the column generation
	private String confirmPassword;
	@Enumerated(EnumType.STRING) // to specfy col type - enum
	@Column(name = "user_role")
	private UserRole userRole=UserRole.ROLE_STUDENT;
	@Column(name = "phone_no")
	private String phone;
	
	
//	public UserEntity(String firstName, String lastName, LocalDate dob) {
//		super();
//		this.firstName = firstName;
//		this.lastName = lastName;
//		
//	}

	
	//implement methods of UserDetails i/f
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(this.userRole.name()));
	}

	@Override
	public String getUsername() {
		
		return this.email;
	}

}
