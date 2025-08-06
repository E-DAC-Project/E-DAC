package com.sunbeam.dto;

//@Getter
//@Setter
public class AddModuleDto {

	private String moduleName;
	private String description;
	private int modulePeriod;
	
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getModulePeriod() {
		return modulePeriod;
	}
	public void setModulePeriod(int modulePeriod) {
		this.modulePeriod = modulePeriod;
	}	
}
