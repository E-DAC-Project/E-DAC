package com.sunbeam.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "SubTopics")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = {"interviewQuestions","mcqList","examLink"})
public class SubTopics extends BaseEntity {

	@Column(name = "topic_name", length = 50)
	@NotBlank(message = "Topic name not be null")
	private String subTopicName;
	@ManyToOne
	@JoinColumn(name = "topic_Id", nullable = false)
	private Topics topic;
	@OneToMany(mappedBy = "subTopic", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MCQ> mcqList = new ArrayList<MCQ>();
	@OneToMany(mappedBy = "subTopic", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InterviewQuestion> interviewQuestions = new ArrayList<InterviewQuestion>();
//	@OneToMany(mappedBy = "subTopic", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<ExamLink> examLink = new ArrayList<ExamLink>();
}
