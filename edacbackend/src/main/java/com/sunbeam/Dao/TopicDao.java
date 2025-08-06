package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.Modules;
import com.sunbeam.entities.Topics;

public interface TopicDao extends JpaRepository<Topics, Long>{

	@Query("select t from Topics t where t.module.id=:moduleId")
	List<Topics> findByModuleId(Long moduleId);
	boolean existsByTopicName(String name);
	@Query("select m from Modules m where m.id=:id")
	Modules findModuleById(Long id);
	@Query("select t from Topics t where t.topicName=:name and t.module.id=:id")
	Topics findByTopicNameAndModuleId(String name, Long id);
}
