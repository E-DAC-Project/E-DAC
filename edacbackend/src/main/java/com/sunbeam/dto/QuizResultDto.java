package com.sunbeam.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class QuizResultDto {
    private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;
    private List<Long> correctQuestionIds;
    private List<Long> wrongQuestionIds;
}
