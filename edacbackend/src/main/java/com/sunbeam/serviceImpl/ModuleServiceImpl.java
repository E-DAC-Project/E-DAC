package com.sunbeam.serviceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.Dao.ModuleDao;
import com.sunbeam.customException.InvalidInputException;
import com.sunbeam.dto.AddModuleDto;
import com.sunbeam.dto.ModuleDto;
import com.sunbeam.entities.Modules;
import com.sunbeam.service.ModuleService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class ModuleServiceImpl implements ModuleService {

	private final ModuleDao moduleDao;
	private final ModelMapper modelMapper;

	@Override
	public List<ModuleDto> getAllActiveModules(boolean status) {
		
		return moduleDao.findByStatus(status).stream()
				.map(module->modelMapper.map(module, ModuleDto.class))
				.toList();
	}

	@Override
	public String addNewModule(AddModuleDto newModule) {
		
		System.out.println(newModule.getModuleName());
		if(moduleDao.existsByModuleName(newModule.getModuleName())) {
			throw new InvalidInputException("Module with given name already exists");
		}
		Modules m = modelMapper.map(newModule, Modules.class);
		Modules addedModule = moduleDao.save(m);
		return addedModule.getModuleName() + " Module added successfully";
	}
}
