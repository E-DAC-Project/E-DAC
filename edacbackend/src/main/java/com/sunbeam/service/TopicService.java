package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.AddTopicDto;
import com.sunbeam.dto.TopicDto;
import com.sunbeam.entities.Topics;

public interface TopicService {

	List<TopicDto> getAllTopicByModule(Long id);
	String addNewTopic(AddTopicDto newTopic, Long id);
	Topics updateTopic(Long id, TopicDto topicDetails); 
	void deleteTopic(Long id); 
}
