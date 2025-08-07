package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ReferenceBookDto;
import com.sunbeam.service.ReferenceBookService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ReferenceBookController {

	private final ReferenceBookService rbService;
	
	@GetMapping("/referenceBook")
	public ResponseEntity<?> getReferenceBookByModule(@RequestParam Long moduleId) {
		
		List<ReferenceBookDto> rbList = rbService.getReferenceBookByModule(moduleId);
		
		if(rbList.isEmpty()) {
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(rbList);
	}
	
	@PostMapping("addReferenceBook")
	public String addTopic(@RequestBody ReferenceBookDto rbDto, @RequestParam Long moduleId) {
		
		return rbService.addNewReferenceBook(rbDto, moduleId);
	}
	
	
	@PutMapping("/editReferenceBook/{id}")
    public ResponseEntity<ReferenceBookDto> updateReferenceBook(@PathVariable Long id, @RequestBody ReferenceBookDto rbDto) {
        ReferenceBookDto updatedReferenceBook = rbService.updateReferenceBook(id, rbDto);
        return ResponseEntity.ok(updatedReferenceBook);
    }
	
    @DeleteMapping("/deleteReferenceBook/{id}")
    public ResponseEntity<String> deleteReferenceBook(@PathVariable Long id) {
        rbService.deleteReferenceBook(id);
        return ResponseEntity.ok("Reference book deleted successfully");
    }
}
