package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.SubtopicDto;

public interface SubTopicService {

	List<SubtopicDto> getAllSubTopicByTopic(Long id);
	String addNewSubTopic(SubtopicDto newSubTopic, Long id);
}
