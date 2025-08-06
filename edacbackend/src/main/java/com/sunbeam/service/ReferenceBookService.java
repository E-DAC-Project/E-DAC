package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ReferenceBookDto;

public interface ReferenceBookService {

	List<ReferenceBookDto> getReferenceBookByModule(Long id);
	String addNewReferenceBook(ReferenceBookDto rbDto, Long moduleId);
}
