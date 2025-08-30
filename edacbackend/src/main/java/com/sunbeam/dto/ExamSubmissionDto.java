package com.sunbeam.dto;

import java.util.List;

public class ExamSubmissionDto {
    private Long quizId;
    private List<ResponseDto> responses;

    public ExamSubmissionDto() {}
    public ExamSubmissionDto(Long quizId, List<ResponseDto> responses) {
        this.quizId = quizId; this.responses = responses;
    }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }
    public List<ResponseDto> getResponses() { return responses; }
    public void setResponses(List<ResponseDto> responses) { this.responses = responses; }
}

