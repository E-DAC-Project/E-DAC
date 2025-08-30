package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ExamSubmissionDto;
import com.sunbeam.dto.QuestionDto;
import com.sunbeam.dto.QuizSummaryDto;
import com.sunbeam.dto.ResultDto;
import com.sunbeam.entities.Quiz;

public interface QuizService {

	List<QuizSummaryDto> getQuizzesForModule(Long moduleId);
	Quiz getQuizById(Long quizId);
	List<QuestionDto> getRandomQuestions(Long quizId, int count);
	ResultDto evaluateExam(Long quizId, ExamSubmissionDto submission, String username);
}
