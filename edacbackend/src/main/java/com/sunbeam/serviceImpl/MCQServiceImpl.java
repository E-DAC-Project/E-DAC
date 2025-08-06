package com.sunbeam.serviceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.Dao.MCQDao;
import com.sunbeam.customException.InvalidInputException;
import com.sunbeam.dto.AddMcqDto;
import com.sunbeam.dto.MCQDto;
import com.sunbeam.entities.MCQ;
import com.sunbeam.entities.SubTopics;
import com.sunbeam.service.MCQService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class MCQServiceImpl implements MCQService {

	private final MCQDao mcqDao;
	private final ModelMapper modelMapper;
	
	@Override
	public List<MCQDto> getAllMCQById(Long id) {
		
		return mcqDao.findBySubTopicId(id).stream()
		.map(mcq->modelMapper.map(mcq, MCQDto.class))
		.toList();
	}

	@Override
	public String addNewMcq(AddMcqDto newMcq, Long subTopicId) {
		
		SubTopics st = mcqDao.findSubTopicById(subTopicId);
		if(st!=null) {
			
			MCQ mcq = mcqDao.findByMcqAndSubTopicId(newMcq.getQuestion(), subTopicId);
			if(mcq!=null) {
				
				throw new InvalidInputException("MCQ already Exists for given sub-topic");
			}
			MCQ m = modelMapper.map(newMcq, MCQ.class);
			m.setSubTopic(st);
			st.getMcqList().add(m);
			mcqDao.save(m);
			return "MCQ Added in the list";
		} else {
			
			throw new InvalidInputException("Sub Topic with given id is not present");
		}
	}
}
