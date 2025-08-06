package com.sunbeam.Dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.UserEntity;

public interface UserEntityDao extends JpaRepository<UserEntity,Long> {
	boolean existsByEmail(String email);	
	Optional<UserEntity> findByEmail(String email);
}
