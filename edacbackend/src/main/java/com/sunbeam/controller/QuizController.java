package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ExamSubmissionDto;
import com.sunbeam.dto.QuestionDto;
import com.sunbeam.dto.QuizSummaryDto;
import com.sunbeam.dto.ResultDto;
import com.sunbeam.entities.Quiz;
import com.sunbeam.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/quizList/{moduleId}")
    public ResponseEntity<List<QuizSummaryDto>> list(@PathVariable Long moduleId) {
        return ResponseEntity.ok(quizService.getQuizzesForModule(moduleId));
    }
    
    @GetMapping("/quizInstruction/{quizId}")
    public ResponseEntity<QuizSummaryDto> getQuiz(@PathVariable Long quizId) {
        Quiz q = quizService.getQuizById(quizId);
        return ResponseEntity.ok(new QuizSummaryDto(q.getId(), q.getTitle(), q.getDurationMinutes()));
    }
    
    @GetMapping("/startQuiz/{quizId}")
    public ResponseEntity<List<QuestionDto>> getRandomQuestions(
            @PathVariable Long quizId,
            @RequestParam(defaultValue = "10") int count) {

        List<QuestionDto> questions = quizService.getRandomQuestions(quizId, count);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submitQuiz/{quizId}")
    public ResponseEntity<ResultDto> submitExam(
            @PathVariable Long quizId,
            @RequestBody ExamSubmissionDto submission,
            Authentication authentication) {

        String username = authentication.getName();
        System.out.println(username);
        ResultDto result = quizService.evaluateExam(quizId, submission, username);
        return ResponseEntity.ok(result);
    }
}
