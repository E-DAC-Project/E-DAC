package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.AddInterviewQuestionDto;
import com.sunbeam.dto.InterviewQuestionResponseDto;
import com.sunbeam.dto.InterviewQuestionResponseDto;
import com.sunbeam.dto.UpdateInterviewQuestionDto;
import com.sunbeam.entities.InterviewQuestion;

public interface InterviewQuestionService {

	List<InterviewQuestionResponseDto> getIqBySubTopicId(Long id);
	String addNewInterviewQuestion(AddInterviewQuestionDto newInterviewQuestion, Long subTopicId);
	InterviewQuestionResponseDto updateQuestion(Long id, UpdateInterviewQuestionDto updateDto);
    void deleteQuestion(Long id);
	
	
	
}
