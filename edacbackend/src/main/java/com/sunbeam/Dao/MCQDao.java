package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.MCQ;
import com.sunbeam.entities.SubTopics;

public interface MCQDao extends JpaRepository<MCQ, Long>{

	@Query("select m from MCQ m where m.subTopic.id=:subtopicId")
	List<MCQ> findBySubTopicId(Long subtopicId);
	@Query("select st from SubTopics st where st.id=:subTopicId")
	SubTopics findSubTopicById(Long subTopicId);
	@Query("select m from MCQ m where m.question=:newMcq and m.subTopic.id=:subTopicId")
	MCQ findByMcqAndSubTopicId(String newMcq, Long subTopicId);
}
