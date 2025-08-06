package com.sunbeam.dto;

import com.sunbeam.entities.UserRole;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	
	private String firstName;
	private String lastName;	
	private String email;		
	private UserRole userRole;
}
