package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; // Added for DELETE
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; // Added for PathVariable
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping; // Added for PUT
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddTopicDto;
import com.sunbeam.dto.TopicDto;
import com.sunbeam.service.TopicService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/topics")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TopicController {

	private final TopicService topicService;
	
	@GetMapping("/getTopics/{id}")
	public ResponseEntity<?> getTopicsByModule(@PathVariable Long id) {
		
		List<TopicDto> topicList =  topicService.getAllTopicByModule(id);
		if(topicList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(topicList);
	}
	@PostMapping("/addTopic/{moduleId}")
	public String addTopic(@RequestBody AddTopicDto newTopic, @PathVariable Long moduleId) {
		
		System.out.println(newTopic.getTopicName());
		return topicService.addNewTopic(newTopic, moduleId);
	}

	@PutMapping("/editTopic/{id}") 
	public ResponseEntity<?> updateTopic(@PathVariable Long id, @RequestBody TopicDto topicDetails) {
		return ResponseEntity.ok(topicService.updateTopic(id, topicDetails));
	}

	@DeleteMapping("/deleteTopic/{id}") 
	public ResponseEntity<String> deleteTopic(@PathVariable Long id) {
		topicService.deleteTopic(id);
		return ResponseEntity.ok("Topic with ID " + id + " deleted successfully.");
	}
}
