package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.AddModuleDto;
import com.sunbeam.dto.ModuleDto;
import com.sunbeam.entities.Modules;

public interface ModuleService {

	List<ModuleDto> getAllActiveModules(boolean status);
	String addNewModule(AddModuleDto newModule);
	Modules updateModule(Long id, AddModuleDto moduleDetails); 
	void deleteModule(Long id);
}
