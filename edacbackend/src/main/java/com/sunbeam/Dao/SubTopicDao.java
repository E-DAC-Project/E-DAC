package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.SubTopics;
import com.sunbeam.entities.Topics;

public interface SubTopicDao extends JpaRepository<SubTopics, Long> {

	@Query("select t from SubTopics t where t.topic.id=:topicId")
	List<SubTopics> findByTopicId(Long topicId);
	@Query("select t from Topics t where t.id=:id")
	Topics findTopicById(Long id);
	@Query("select st from SubTopics st where st.subTopicName=:SubTopic and st.topic.id=:id")
	SubTopics findBySubTopicNameAndTopicId(String SubTopic, Long id);
}
