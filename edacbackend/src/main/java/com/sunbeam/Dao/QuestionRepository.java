package com.sunbeam.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{

}
