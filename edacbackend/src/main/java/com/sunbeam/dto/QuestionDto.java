package com.sunbeam.dto;

import java.util.List;

import com.sunbeam.entities.Answer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionDto {
    private Long id;
    private String questionText;
    private List<Answer> answers;
}
