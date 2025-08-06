package com.sunbeam.serviceImpl;

import com.sunbeam.Dao.InterviewQuestionDao;
import com.sunbeam.customException.InvalidInputException;
import com.sunbeam.dto.*;
import com.sunbeam.entities.InterviewQuestion;
import com.sunbeam.entities.SubTopics;
import com.sunbeam.service.InterviewQuestionService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InterviewQuestionServiceImpl implements InterviewQuestionService {

    private final InterviewQuestionDao iqDao;
    private final ModelMapper modelMapper;

    @Override
    public List<InterviewQuestionResponseDto>getIqBySubTopicId(Long id) {
        return iqDao.findAll().stream()
                .map(question -> modelMapper.map(question, InterviewQuestionResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public String addNewInterviewQuestion(AddInterviewQuestionDto newInterviewQuestion, Long subTopicId) {
        SubTopics st = iqDao.findSubTopicById(subTopicId);
        if (st != null) {
            InterviewQuestion existingQuestion = iqDao.findByInterviewQuestionAndSubTopicId(
                newInterviewQuestion.getQuestion(), subTopicId);
            if (existingQuestion != null) {
                throw new InvalidInputException("Question already exists for the given sub-topic");
            }
            InterviewQuestion iq = modelMapper.map(newInterviewQuestion, InterviewQuestion.class);
            iq.setSubTopic(st);
            st.getInterviewQuestions().add(iq);
            iqDao.save(iq);
            return "Question added successfully";
        } else {
            throw new InvalidInputException("Sub Topic not found");
        }
    }

    @Override
    public InterviewQuestionResponseDto updateQuestion(Long id, UpdateInterviewQuestionDto updateDto) {
        InterviewQuestion existingQuestion = iqDao.findById(id)
                .orElseThrow(() -> new InvalidInputException("Question not found with ID: " + id));

        if (!existingQuestion.getQuestion().equals(updateDto.getQuestion()) && 
            iqDao.existsByQuestion(updateDto.getQuestion())) {
            throw new InvalidInputException("Question already exists");
        }

        modelMapper.map(updateDto, existingQuestion);
        InterviewQuestion updatedQuestion = iqDao.save(existingQuestion);
        return modelMapper.map(updatedQuestion, InterviewQuestionResponseDto.class);
    }

    @Override
    public void deleteQuestion(Long id) {
        if (!iqDao.existsById(id)) {
            throw new InvalidInputException("Question not found with ID: " + id);
        }
        iqDao.deleteById(id);
    }
}
