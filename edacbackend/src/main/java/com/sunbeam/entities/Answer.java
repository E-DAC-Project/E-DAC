package com.sunbeam.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "answers")
@Getter
@Setter
public class Answer extends BaseEntity {

    private String answerText;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
