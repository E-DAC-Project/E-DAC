package com.sunbeam.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubtopicDto {
	
	private String subTopicName;
	private Long id; // For response and update purposes
    @NotBlank(message = "SubTopic title is required")
    private String title;
    private Long topicId;
}
