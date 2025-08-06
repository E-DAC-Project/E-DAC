package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddMcqDto;
import com.sunbeam.dto.MCQDto;
import com.sunbeam.service.MCQService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class MCQController {

	private final MCQService mcqService;
	
	@GetMapping("/mcq")
	public ResponseEntity<?> getAllBySubTopicId(@RequestParam Long id) {
		
		List<MCQDto> mcqList = mcqService.getAllMCQById(id);
		if(mcqList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(mcqList);
	}
	@PostMapping("/addMCQ")
	public String addMCQ(@RequestBody AddMcqDto newMcq, @RequestParam Long subTopicId) {
		
		return mcqService.addNewMcq(newMcq, subTopicId);
	}
}
