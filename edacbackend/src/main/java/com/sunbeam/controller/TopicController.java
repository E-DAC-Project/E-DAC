package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.TopicDto;
import com.sunbeam.service.TopicService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class TopicController {

	private final TopicService topicService;
	
	@GetMapping("/topics")
	public ResponseEntity<?> getTopicsByModule(@RequestParam Long id) {
		
		List<TopicDto> topicList =  topicService.getAllTopicByModule(id);
		if(topicList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(topicList);
	}
	@PostMapping("addTopic")
	public String addTopic(@RequestBody TopicDto newTopic, @RequestParam Long moduleId) {
		
		return topicService.addNewTopic(newTopic, moduleId);
	}
}
