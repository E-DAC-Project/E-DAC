package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.SubtopicDto;
import com.sunbeam.service.SubTopicService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class SubTopicController {

	private final SubTopicService subTopicService;
	
	@GetMapping("/subTopics")
	public ResponseEntity<?> getSubTopicByTopic(@RequestParam Long id) {
		
		List<SubtopicDto> subTopicList = subTopicService.getAllSubTopicByTopic(id);
		if(subTopicList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(subTopicList);
	}
	@PostMapping("/addSubTopic")
	public String addSubTopic(@RequestBody SubtopicDto newSubTopic, @RequestParam Long topicId) {
		
		return subTopicService.addNewSubTopic(newSubTopic, topicId);
	}
	
	@PutMapping("/editSubTopic/{id}")
    public ResponseEntity<SubtopicDto> updateSubTopic(
            @PathVariable Long id, 
            @RequestBody SubtopicDto subTopicDto) {
        return ResponseEntity.ok(subTopicService.updateSubTopic(id, subTopicDto));
    }
    
    @DeleteMapping("/deleteSubTopic/{id}")
    public ResponseEntity<String> deleteSubTopic(@PathVariable Long id) {
        subTopicService.deleteSubTopic(id);
        return ResponseEntity.ok("SubTopic deleted successfully");
    }
}
