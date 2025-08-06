package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionResponseDto {
    private Long id;
    private String question;
    private String answer;
    private String difficulty;
    private boolean status;
    private Long subTopicId;
}
