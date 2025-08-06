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
@Table(name = "Topics")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = "subtopicList")
public class Topics extends BaseEntity {

	@Column(name = "topic_name", length = 50)
	@NotBlank(message = "Topic name not be null")
	private String topicName;
	@Column(name = "status", columnDefinition = "BOOLEAN DEFAULT TRUE" )
	private boolean status;
	@ManyToOne
	@JoinColumn(name = "moduleId", nullable = false)
	private Modules module;
	@OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SubTopics> subtopicList = new ArrayList<SubTopics>();
}
