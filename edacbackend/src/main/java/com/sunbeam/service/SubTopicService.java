package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.SubtopicDto;
import com.sunbeam.dto.addSubTopicDto;

public interface SubTopicService {

	List<SubtopicDto> getAllSubTopicByTopic(Long id);
	String addNewSubTopic(addSubTopicDto newSubTopic, Long id);
	SubtopicDto updateSubTopic(Long id, SubtopicDto subTopicDto);
    void deleteSubTopic(Long id);
}
