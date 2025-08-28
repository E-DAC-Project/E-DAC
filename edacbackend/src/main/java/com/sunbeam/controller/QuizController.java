package com.sunbeam.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.Dao.QuizRepository;
import com.sunbeam.dto.QuizResultDto;
import com.sunbeam.dto.QuizSubmissionDto;
import com.sunbeam.entities.Quiz;
import com.sunbeam.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final QuizRepository quizRepository;

    @GetMapping("/getQuestions/{moduleId}")
    public List<Quiz> getQuizzesByModule(@PathVariable Long moduleId) {
    	return quizRepository.findRandom10ByModuleId(moduleId);
    }

    @PostMapping("/submit")
    public QuizResultDto submitQuiz(@RequestBody QuizSubmissionDto submission) {
        return quizService.submitQuiz(submission);
    }
}
