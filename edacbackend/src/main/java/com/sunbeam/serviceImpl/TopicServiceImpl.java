package com.sunbeam.serviceImpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.Dao.TopicDao;
import com.sunbeam.customException.InvalidInputException;
import com.sunbeam.dto.TopicDto;
import com.sunbeam.entities.Modules;
import com.sunbeam.entities.Topics;
import com.sunbeam.service.TopicService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TopicServiceImpl implements TopicService {

	private final TopicDao topicDao;
	private final ModelMapper modelMapper;
	@Override
	public List<TopicDto> getAllTopicByModule(Long id) {
		
		return topicDao.findByModuleId(id).stream()
				.map(topic->modelMapper.map(topic, TopicDto.class))
				.toList();
	}
	@Override
	public String addNewTopic(TopicDto newTopic, Long id) {
		
		Modules m = topicDao.findModuleById(id);
		if(m!=null) {
			
			Topics topic = topicDao.findByTopicNameAndModuleId(newTopic.getTopicName(), id);
			if(topic!=null) {
				
				throw new InvalidInputException("Topic name already Exists for given module");
			}
			Topics t = modelMapper.map(newTopic, Topics.class);
			t.setModule(m);
			m.getTopicList().add(t);
			Topics addedTopic = topicDao.save(t);
			return addedTopic.getTopicName() + "Added in the list";
		} else {
			
			throw new InvalidInputException("Module with given id is not present");
		}
	}
}