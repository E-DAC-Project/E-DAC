package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddModuleDto;
import com.sunbeam.dto.ModuleDto;
import com.sunbeam.entities.Modules;
import com.sunbeam.service.ModuleService;

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
	public String addModule(@RequestBody AddModuleDto newModule) {
		
		return moduleService.addNewModule(newModule);
	}
	
	@PutMapping("/editModule/{id}") 
	public ResponseEntity<String> updateModule(@PathVariable Long id, @RequestBody AddModuleDto moduleDetails) { 
		moduleService.updateModule(id, moduleDetails);
		return ResponseEntity.ok().body("Module updated successfully");
	}
	
	@DeleteMapping("/deleteModule/{id}") 
	public ResponseEntity<String> deleteModule(@PathVariable Long id) { 
		moduleService.deleteModule(id);
		return ResponseEntity.ok("Module with ID " + id + " deleted successfully.");
	}
	
}
