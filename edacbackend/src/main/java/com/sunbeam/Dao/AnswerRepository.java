package com.sunbeam.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
