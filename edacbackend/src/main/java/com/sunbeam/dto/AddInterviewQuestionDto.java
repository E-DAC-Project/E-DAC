package com.sunbeam.dto;

import com.sunbeam.entities.Difficulty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AddInterviewQuestionDto {
	private String question;
	private String answer;
	private Difficulty difficulty;
	private boolean status;
}
