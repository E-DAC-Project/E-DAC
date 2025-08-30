package com.sunbeam.Dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.User;
import com.sunbeam.entities.UserEntity;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("select u from UserEntity u where u.email=:username")
	Optional<UserEntity> findByUsername(String username);
}
