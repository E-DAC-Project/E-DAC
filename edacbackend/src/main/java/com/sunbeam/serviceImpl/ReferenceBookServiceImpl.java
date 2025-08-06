package com.sunbeam.serviceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.Dao.ReferenceBookDao;
import com.sunbeam.customException.InvalidInputException;
import com.sunbeam.dto.ReferenceBookDto;
import com.sunbeam.entities.Modules;
import com.sunbeam.entities.ReferenceBooks;
import com.sunbeam.service.ReferenceBookService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ReferenceBookServiceImpl implements ReferenceBookService {
	
	private final ReferenceBookDao rbDao;
	private final ModelMapper modelMapper;

	@Override
	public List<ReferenceBookDto> getReferenceBookByModule(Long id) {
		
		return rbDao.findReferenceBooksByModuleId(id).stream()
				.map(rb->modelMapper.map(rb, ReferenceBookDto.class))
				.toList();
	}

	@Override
	public String addNewReferenceBook(ReferenceBookDto rbDto, Long moduleId) {
		Modules m = rbDao.findModuleById(moduleId);
		if(m!=null) {
			
			ReferenceBooks rb = rbDao.findByBookNameAndModuleId(rbDto.getBook_title(), moduleId);
			if(rb!=null) {
				
				throw new InvalidInputException("Reference book of given title already exists for given module");
			}
			ReferenceBooks r = modelMapper.map(rbDto, ReferenceBooks.class);
			r.setModule(m);
			m.getRbList().add(r);
			rbDao.save(r);
			return "Reference book added successfully";
		} else {
			
			throw new InvalidInputException("Module with given id is not present");
		}
	}
}
