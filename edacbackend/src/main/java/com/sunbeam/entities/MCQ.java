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
@Table(name = "MCQ")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class MCQ extends BaseEntity {

	@Column(name = "question", columnDefinition = "TEXT")
	@NotBlank(message = "Please enter mcq question")
	private String question;
	@Column(name = "option_a", nullable = false)
	private String option_a;
	@Column(name = "option_b", nullable = false)
	private String option_b;
	@Column(name = "option_c", nullable = false)
	private String option_c;
	@Column(name = "option_d", nullable = false)
	private String option_d;
	@Column(name = "answer", nullable = false)
	private String answer;
	@Enumerated(EnumType.STRING)
	@Column(name = "difficulty")
	private Difficulty difficulty;
	@Column(name = "status", columnDefinition = "BOOLEAN DEFAULT TRUE" )
	private boolean status;
	@ManyToOne
	@JoinColumn(name = "SubTopic_Id")
	private SubTopics subTopic;
}
