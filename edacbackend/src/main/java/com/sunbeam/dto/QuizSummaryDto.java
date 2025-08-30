package com.sunbeam.dto;

//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class QuizSummaryDto {
//
//	private Long id;
//	private String title;
//	private Integer durationMinutes;
//	
//	
//}
public record QuizSummaryDto(Long id, String title, Integer durationMinutes) {}
