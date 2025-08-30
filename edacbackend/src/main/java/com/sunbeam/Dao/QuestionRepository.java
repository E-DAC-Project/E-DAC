package com.sunbeam.Dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sunbeam.entities.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    // MySQL specific random selection - adjust if you use another DB
    @Query(value = "SELECT * FROM questions WHERE quiz_id = :quizId ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Question> findRandomByQuizId(@Param("quizId") Long quizId, @Param("count") int count);

    List<Question> findByIdIn(List<Long> ids);
}

