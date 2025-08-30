package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_responses")
@Getter
@Setter
public class UserResponse extends BaseEntity {

	@Column(name = "user_id")
    private Long userId; 

    @Column(name = "quiz_id")
    private Long quizId;

    @Column(name = "question_id")
    private Long questionId;

    @Column(name = "selected_answer_id")
    private Long selectedAnswerId;

    private boolean isCorrect;
}
