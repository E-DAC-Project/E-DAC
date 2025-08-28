package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.QuestionDto;
import com.sunbeam.dto.QuizResultDto;
import com.sunbeam.dto.QuizSubmissionDto;

public interface QuizService {

	QuizResultDto submitQuiz(QuizSubmissionDto submission);
	List<QuestionDto> getQuizQuestions(Long quizId);
}
