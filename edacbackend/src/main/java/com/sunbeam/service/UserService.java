package com.sunbeam.service;

import com.sunbeam.dto.SignupReqDTO;
import com.sunbeam.dto.UserDTO;

public interface UserService {


	UserDTO signUp(SignupReqDTO dto);
}
