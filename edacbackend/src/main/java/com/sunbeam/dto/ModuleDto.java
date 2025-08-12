package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleDto {

	private Long id;
	private String moduleName;
	private String description;
	private int modulePeriod;
}
