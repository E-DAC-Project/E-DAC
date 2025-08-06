package com.sunbeam.serviceImpl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.customException.*;
import com.sunbeam.Dao.UserEntityDao;
import com.sunbeam.dto.SignupReqDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entities.UserEntity;
import com.sunbeam.service.UserService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	//depcy - dao layer i/f
	private final UserEntityDao userDao;
	private final ModelMapper modelMapper;
	private final PasswordEncoder encoder;


	@Override
	public UserDTO signUp(SignupReqDTO dto) {
		// 1. validate for dup email
		if(userDao.existsByEmail(dto.getEmail()))
			throw new InvalidInputException("User already exists by email !!!!");
		//2. no dup email , map dto -> entity
		UserEntity entity = modelMapper.map(dto, UserEntity.class);
		//3. encrypt pwd 
		entity.setPassword(encoder.encode(entity.getPassword()));
		//4. save - inherited api
		UserEntity persistentEntity = userDao.save(entity);
		return modelMapper.map(persistentEntity, UserDTO.class);
	}
}
