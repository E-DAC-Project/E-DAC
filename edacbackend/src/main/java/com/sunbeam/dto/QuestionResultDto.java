package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResultDto {

	private Long questionId;
    private Long selectedAnswerId;
    private Long correctAnswerId;
    private boolean correct;
}
