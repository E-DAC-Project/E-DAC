package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.TopicDto;

public interface TopicService {

	List<TopicDto> getAllTopicByModule(Long id);
	String addNewTopic(TopicDto newTopic, Long id);
}
