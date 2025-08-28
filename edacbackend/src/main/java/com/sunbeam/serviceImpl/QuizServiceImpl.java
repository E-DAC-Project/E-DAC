package com.sunbeam.serviceImpl;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.sunbeam.Dao.AnswerRepository;
import com.sunbeam.Dao.QuestionRepository;
import com.sunbeam.Dao.QuizRepository;
import com.sunbeam.Dao.UserResponseRepository;
import com.sunbeam.dto.QuestionDto;
import com.sunbeam.dto.QuizResultDto;
import com.sunbeam.dto.QuizSubmissionDto;
import com.sunbeam.entities.Question;
import com.sunbeam.entities.Quiz;
import com.sunbeam.entities.UserResponse;
import com.sunbeam.service.QuizService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserResponseRepository userResponseRepository;

    public List<QuestionDto> getQuizQuestions(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return quiz.getQuestions().stream()
                .map(q -> {
                    QuestionDto dto = new QuestionDto();
                    dto.setId(q.getId());
                    dto.setQuestionText(q.getQuestionText());
                    dto.setAnswers(q.getAnswers());
                    return dto;
                }).toList();
    }
    public QuizResultDto submitQuiz(QuizSubmissionDto submission) {
        int correctCount = 0;
        int wrongCount = 0;
        List<Long> correctIds = new ArrayList<>();
        List<Long> wrongIds = new ArrayList<>();

        Quiz quiz = quizRepository.findById(submission.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        for (Map.Entry<Long, Long> entry : submission.getAnswers().entrySet()) {
            Long questionId = entry.getKey();
            Long selectedAnswerId = entry.getValue();

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            boolean isCorrect = question.getCorrectAnswerId().equals(selectedAnswerId);

            UserResponse response = new UserResponse();
            response.setUserId(submission.getUserId());
            response.setQuiz(quiz);
            response.setQuestion(question);
            response.setSelectedAnswer(answerRepository.findById(selectedAnswerId).orElse(null));
            response.setCorrect(isCorrect);
            userResponseRepository.save(response);

            if (isCorrect) {
                correctCount++;
                correctIds.add(questionId);
            } else {
                wrongCount++;
                wrongIds.add(questionId);
            }
        }
        return new QuizResultDto(submission.getAnswers().size(), correctCount, wrongCount, correctIds, wrongIds);
    }
}
