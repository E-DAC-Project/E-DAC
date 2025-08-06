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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddInterviewQuestionDto;
import com.sunbeam.dto.InterviewQuestionResponseDto;
import com.sunbeam.dto.InterviewQuestionResponseDto;
import com.sunbeam.dto.UpdateInterviewQuestionDto;
import com.sunbeam.entities.InterviewQuestion;
import com.sunbeam.service.InterviewQuestionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/interview-questions")
@AllArgsConstructor
public class InterviewQuestionController {

	private final InterviewQuestionService iqService;
	
	@GetMapping("/interviewQuestion")
	public ResponseEntity<?> getIqBySubTopicId(@RequestParam Long id) {
		
		List<InterviewQuestionResponseDto> iqList = iqService.getIqBySubTopicId(id);
		if(iqList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(iqList);
	}
	@PostMapping("/addInterviewQuestion")
	public String addaddInterviewQuestion(@RequestBody AddInterviewQuestionDto newInterviewQuestion, @RequestParam Long subTopicId) {
		
		return iqService.addNewInterviewQuestion(newInterviewQuestion, subTopicId);
		
	}
	
	 @PutMapping("/editInterviewQuestions/{id}")
	    public ResponseEntity<InterviewQuestionResponseDto> updateQuestion(
	            @PathVariable Long id,
	            @RequestBody UpdateInterviewQuestionDto questionDto) {
	        InterviewQuestionResponseDto updatedQuestion = iqService.updateQuestion(id, questionDto);
	        return ResponseEntity.ok(updatedQuestion);
	 }
	 @DeleteMapping("/deleteInterviewQuestions/{id}")
	    	public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
	        iqService.deleteQuestion(id);
	        return ResponseEntity.ok("Question with ID " + id + " deleted successfully.");
	    }
	}
	
	

