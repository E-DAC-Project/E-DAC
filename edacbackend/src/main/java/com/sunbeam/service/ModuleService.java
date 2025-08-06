package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.AddModuleDto;
import com.sunbeam.dto.ModuleDto;

public interface ModuleService {

	List<ModuleDto> getAllActiveModules(boolean status);
	String addNewModule(AddModuleDto newModule);
}
