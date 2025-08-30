package com.sunbeam.Dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Answer;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByQuestionId(Long questionId);
    List<Answer> findByQuestionIdIn(List<Long> questionIds);
}

