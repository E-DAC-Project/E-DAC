package com.sunbeam.dto;

import com.sunbeam.entities.Difficulty;

import lombok.Data;

@Data
public class AddMcqDto {
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    private Difficulty difficulty;
    private boolean status;
}
