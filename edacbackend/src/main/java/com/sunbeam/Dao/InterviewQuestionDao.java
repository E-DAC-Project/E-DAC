package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.InterviewQuestion;
import com.sunbeam.entities.SubTopics;

public interface InterviewQuestionDao extends JpaRepository<InterviewQuestion, Long>{

	@Query("select i from InterviewQuestion i where i.subTopic.id=:subTopicId")
	List<InterviewQuestion> findBysubTopicId(Long subTopicId);
	@Query("select st from SubTopics st where st.id=:subTopicId")
	SubTopics findSubTopicById(Long subTopicId);
	@Query("select iq from InterviewQuestion iq where iq.question=:question and iq.subTopic.id=:subTopicId")
	InterviewQuestion findByInterviewQuestionAndSubTopicId(String question, Long subTopicId);
	boolean existsByQuestion(String question);
}
