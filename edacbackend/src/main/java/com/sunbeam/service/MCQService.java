package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.AddMcqDto;
import com.sunbeam.dto.MCQDto;
import com.sunbeam.dto.UpdateMCQDto;

public interface MCQService {

	List<MCQDto> getAllMCQById(Long id);
	String addNewMcq(AddMcqDto newMcq, Long subTopicId);
	MCQDto updateMCQ(Long id, UpdateMCQDto updateDto);
    void deleteMCQ(Long id);
}
