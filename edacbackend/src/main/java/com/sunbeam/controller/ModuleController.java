package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddModuleDto;
import com.sunbeam.dto.ModuleDto;
import com.sunbeam.service.ModuleService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/module")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ModuleController {

	private final ModuleService moduleService;
	
	@GetMapping("/getModules")
	public ResponseEntity<?> getAllActiveModules() {
		
		List<ModuleDto> moduleList = moduleService.getAllActiveModules(true);
		if(moduleList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(moduleList);
	}
	
	@PostMapping("/addModule")
	public String addModule(@Valid @RequestBody AddModuleDto newModule) {
		
		return moduleService.addNewModule(newModule);
	}
}
