package com.sunbeam.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultDto {

	private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;
    private int score;
    private List<QuestionResultDto> details; 
}
