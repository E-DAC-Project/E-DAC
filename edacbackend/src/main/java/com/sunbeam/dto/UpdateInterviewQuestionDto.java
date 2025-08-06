package com.sunbeam.dto;

import lombok.Data;

@Data
public class UpdateInterviewQuestionDto {
    private String question;
    private String answer;
    private String difficulty;
    private boolean status;
}
