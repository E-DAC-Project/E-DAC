package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "interviewQuestion")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class InterviewQuestion extends BaseEntity {

	@Column(name = "question", columnDefinition = "TEXT")
	@NotBlank(message = "Please enter interview question")
	private String question;
	@Column(name = "answer", nullable = false, columnDefinition = "TEXT")
	private String answer;
	@Enumerated(EnumType.STRING)
	@Column(name = "difficulty")
	private Difficulty difficulty;
	@Column(name = "status", columnDefinition = "BOOLEAN DEFAULT TRUE" )
	private boolean status;
	@ManyToOne
	@JoinColumn(name = "SubTopic_Id", nullable = false)
	private SubTopics subTopic;
}
