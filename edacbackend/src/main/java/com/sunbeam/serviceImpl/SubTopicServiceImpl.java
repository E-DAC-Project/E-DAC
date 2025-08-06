package com.sunbeam.serviceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.Dao.SubTopicDao;
import com.sunbeam.customException.InvalidInputException;
import com.sunbeam.dto.SubtopicDto;
import com.sunbeam.entities.SubTopics;
import com.sunbeam.entities.Topics;
import com.sunbeam.service.SubTopicService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SubTopicServiceImpl implements SubTopicService {

	private final SubTopicDao subtopicDao;
	private final ModelMapper modelMapper;
	@Override
	public List<SubtopicDto> getAllSubTopicByTopic(Long id) {
		
		return subtopicDao.findByTopicId(id).stream()
				.map(subtopic->modelMapper.map(subtopic, SubtopicDto.class))
				.toList();
	}
	@Override
	public String addNewSubTopic(SubtopicDto newSubTopic, Long id) {
		
		Topics t = subtopicDao.findTopicById(id);
		if(t!=null) {
			
			SubTopics subtopic = subtopicDao.findBySubTopicNameAndTopicId(newSubTopic.getSubTopicName(), id);
			if(subtopic!=null) {
				
				throw new InvalidInputException("Sub Topic name already Exists for given topic");
			}
			SubTopics st = modelMapper.map(newSubTopic, SubTopics.class);
			st.setTopic(t);
			t.getSubtopicList().add(st);
			SubTopics addedSubTopic = subtopicDao.save(st);
			return addedSubTopic.getSubTopicName() + " Added in the list";
		} else {
			
			throw new InvalidInputException("Topic with given id is not present");
		}
	}
}
