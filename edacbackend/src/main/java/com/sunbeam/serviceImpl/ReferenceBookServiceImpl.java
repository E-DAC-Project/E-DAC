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
                .map(rb -> modelMapper.map(rb, ReferenceBookDto.class))
                .toList();
    }

    @Override
    public String addNewReferenceBook(ReferenceBookDto rbDto, Long moduleId) {
        Modules m = rbDao.findModuleById(moduleId);
        if (m != null) {
            ReferenceBooks rb = rbDao.findByBookNameAndModuleId(rbDto.getBookTitle(), moduleId);
            if (rb != null) {
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

    @Override
    public ReferenceBookDto updateReferenceBook(Long id, ReferenceBookDto rbDto) {
        ReferenceBooks existingBook = rbDao.findById(id)
                .orElseThrow(() -> new InvalidInputException("Reference book not found with ID: " + id));

    
        if (!existingBook.getBookTitle().equals(rbDto.getBookTitle()) &&
            rbDao.existsByBookTitleAndModuleId(rbDto.getBookTitle(), existingBook.getModule().getId())) {
            throw new InvalidInputException("Reference book of given title already exists for the module");
        }

        // Update fields
        existingBook.setBookTitle(rbDto.getBookTitle());
        existingBook.setAuthor(rbDto.getAuthor());
    	existingBook.setAuthor(rbDto.getLink());
        

        ReferenceBooks updatedBook = rbDao.save(existingBook);
        return modelMapper.map(updatedBook, ReferenceBookDto.class);
    	
    }

    @Override
    public void deleteReferenceBook(Long id) {
        if (!rbDao.existsById(id)) {
            throw new InvalidInputException("Reference book not found with ID: " + id);
        }
        rbDao.deleteById(id);
    }
}

