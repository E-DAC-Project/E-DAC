package com.sunbeam.serviceImpl;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sunbeam.Dao.AnswerRepository;
import com.sunbeam.Dao.QuestionRepository;
import com.sunbeam.Dao.QuizRepository;
import com.sunbeam.Dao.UserRepository;
import com.sunbeam.Dao.UserResponseRepository;
import com.sunbeam.dto.AnswerDto;
import com.sunbeam.dto.ExamSubmissionDto;
import com.sunbeam.dto.QuestionDto;
import com.sunbeam.dto.QuestionResultDto;
import com.sunbeam.dto.QuizSummaryDto;
import com.sunbeam.dto.ResponseDto;
import com.sunbeam.dto.ResultDto;
import com.sunbeam.entities.Answer;
import com.sunbeam.entities.Question;
import com.sunbeam.entities.Quiz;
import com.sunbeam.entities.User;
import com.sunbeam.entities.UserEntity;
import com.sunbeam.entities.UserResponse;
import com.sunbeam.service.QuizService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;
    private final UserRepository userRepo;
    private final UserResponseRepository userResponseRepo;

	@Override
	public List<QuizSummaryDto> getQuizzesForModule(Long moduleId) {
		 return quizRepository.findByModuleId(moduleId).stream()
	                .map(q -> new QuizSummaryDto(q.getId(), q.getTitle(), q.getDurationMinutes()))
	                .toList();
	}
	@Override
	public Quiz getQuizById(Long quizId) {
		return quizRepository.findById(quizId)
	               .orElseThrow(() -> new RuntimeException("Quiz not found"));
	}
	@Override
	public List<QuestionDto> getRandomQuestions(Long quizId, int count) {
		 List<Question> questions = questionRepo.findRandomByQuizId(quizId, count);

	        // load answers for these questions (minimize queries)
	        List<Long> qIds = questions.stream().map(Question::getId).toList();
	        List<Answer> answers = answerRepo.findByQuestionIdIn(qIds);

	        Map<Long, List<Answer>> answersByQuestion = answers.stream()
	                .collect(Collectors.groupingBy(Answer::getQuestionId));

	        List<QuestionDto> dtos = new ArrayList<>();
	        for (Question q : questions) {
	            List<Answer> opts = answersByQuestion.getOrDefault(q.getId(), List.of());
	            List<AnswerDto> optDtos = opts.stream()
	                    .map(a -> new AnswerDto(a.getId(), a.getAnswerText()))
	                    .collect(Collectors.toList());

	            // optionally shuffle options so order is not predictable
	            Collections.shuffle(optDtos);
	            dtos.add(new QuestionDto(q.getId(), q.getQuestionText(), optDtos));
	        }
	        return dtos;
	}
	@Override
	public ResultDto evaluateExam(Long quizId, ExamSubmissionDto submission, String username) {
		UserEntity user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        Long userId = user.getId();

        List<ResponseDto> responses = submission.getResponses();
        if (responses == null) {
            responses = new ArrayList<>();
        }
        int total = responses.size();
        int correctCount = 0;

        List<UserResponse> toSave = new ArrayList<>();
        List<QuestionResultDto> details = new ArrayList<>();

        List<Long> qIds = responses.stream().map(ResponseDto::getQuestionId).filter(Objects::nonNull).toList();
        List<Question> questions = questionRepo.findByIdIn(qIds);
        Map<Long, Question> qMap = questions.stream().collect(Collectors.toMap(Question::getId, q -> q));

        for (ResponseDto r : responses) {
            Long qId = r.getQuestionId();
            System.out.println("select id = "+ r);
            Long selectedAnsId = r.getSelectedAnswerId();
            Question q = qMap.get(qId);
            if (q == null) {
                // unknown question — skip or treat incorrect
                details.add(new QuestionResultDto(qId, selectedAnsId, null, false));
                toSave.add(createUserResponse(userId, quizId, qId, selectedAnsId, false));
                continue;
            }
            System.out.println("correct id = "+ q.getCorrectAnswerId());
            boolean isCorrect = q.getCorrectAnswerId() != null && q.getCorrectAnswerId().equals(selectedAnsId);
            if (isCorrect) correctCount++;

            details.add(new QuestionResultDto(qId, selectedAnsId, q.getCorrectAnswerId(), isCorrect));
            toSave.add(createUserResponse(userId, quizId, qId, selectedAnsId, isCorrect));
        }

        userResponseRepo.saveAll(toSave);

        int wrong = total - correctCount;
        int score = correctCount; // 1 mark per correct

        System.out.println(total);
        System.out.println(correctCount);
        System.out.println(wrong);
        System.out.println(score);
        System.out.println(details);
        return new ResultDto(total, correctCount, wrong, score, details);
	}
	
	private UserResponse createUserResponse(Long userId, Long quizId, Long questionId, Long selectedAnswerId, boolean isCorrect) {
        UserResponse ur = new UserResponse();
        ur.setUserId(userId);
        ur.setQuizId(quizId);
        ur.setQuestionId(questionId);
        ur.setSelectedAnswerId(selectedAnswerId);
        ur.setCorrect(isCorrect);
        return ur;
    }
}
