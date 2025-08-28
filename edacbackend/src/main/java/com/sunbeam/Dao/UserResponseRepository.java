package com.sunbeam.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.UserResponse;

public interface UserResponseRepository extends JpaRepository<UserResponse, Long> {

}
