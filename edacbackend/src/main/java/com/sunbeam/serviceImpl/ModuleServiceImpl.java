package com.sunbeam.serviceImpl;

import java.util.List;
import java.util.Optional;

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

	@Override
	public Modules updateModule(Long id, AddModuleDto moduleDetails) {
		Modules existingModule = moduleDao.findById(id)
				.orElseThrow(() -> new InvalidInputException("Module not found with ID: " + id));
		
		modelMapper.map(moduleDetails, existingModule);
		if (!existingModule.getModuleName().equals(moduleDetails.getModuleName()) && moduleDao.existsByModuleName(moduleDetails.getModuleName())) {
            throw new InvalidInputException("Module with name " + moduleDetails.getModuleName() + " already exists.");
        }
		
		return moduleDao.save(existingModule);
	}

	@Override
	public void deleteModule(Long id) {
		Modules m = moduleDao.findById(id)
				.orElseThrow(()-> new InvalidInputException("Module not found with ID: " + id));
		m.setStatus(false);
		//moduleDao.save(m);
	}
}
