package com.sunbeam.dto;

import java.util.Map;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class QuizSubmissionDto {
	
    private Long quizId;
    private Long userId;
    private Map<Long, Long> answers; 
}
