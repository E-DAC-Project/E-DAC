package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sunbeam.entities.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	@Query(value = "SELECT * FROM quiz WHERE module_id = :moduleId ORDER BY RAND() LIMIT 10", nativeQuery = true)
	List<Quiz> findRandom10ByModuleId(@Param("moduleId") Long moduleId);
	List<Quiz> findByModuleId(Long moduleId);
}
