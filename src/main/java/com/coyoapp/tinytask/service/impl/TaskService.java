package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.dto.ObjectFactory;
import com.coyoapp.tinytask.dto.TagDTO;
import com.coyoapp.tinytask.dto.TaskDTO;
import com.coyoapp.tinytask.entity.Task;
import com.coyoapp.tinytask.exception.NotFoundException;
import com.coyoapp.tinytask.exception.TaskException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.service.GeneralService;
import com.google.common.collect.Sets;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TaskService implements GeneralService<TaskDTO> {

  private final TaskRepository taskRepository;

  private final ObjectFactory objectFactory;

  private final TagService tagService;

  public TaskService(TaskRepository taskRepository, ObjectFactory objectFactory, TagService tagService) {
    this.taskRepository = taskRepository;
    this.objectFactory = objectFactory;
    this.tagService = tagService;
  }

  @Override
  public TaskDTO saveOrUpdateModel(TaskDTO object) {
    if (object.getDueDate() != null &&
      object.getStartDate() != null &&
      object.getDueDate()
        .before(object.getStartDate())) {
      throw new TaskException("The due date should be after started date");
    }
    if (object.getTags() != null) {//remove duplicates
      Set<TagDTO> tagDTOSet = new HashSet<>(object.getTags());
      if (tagDTOSet.size() > 0) {
        object.getTags().forEach(tagDTO -> {
          if (!tagService.isModelExist(tagDTO)) {
            tagService.saveOrUpdateModel(tagDTO);
          }
        });
        object.setTags(Sets.newConcurrentHashSet(tagDTOSet));
      }
    }

    Task task = objectFactory.buildTask(object);
    Task savedTask = taskRepository.save(task);
    return savedTask != null ? object : null;
  }

  @Override
  public TaskDTO getModel(String id) {
    return taskRepository.findById(id)
      .map(objectFactory::buildTask)
      .orElseThrow(() -> new NotFoundException(
        String.format("the expected %s task not found", id)));
  }

  @Override
  public void removeModel(String id) {
    taskRepository.deleteById(id);
  }

  @Override
  public List<TaskDTO> getModels() {
    List<Task> taskList = taskRepository.findAll();
    List<TaskDTO> taskDTOList = new ArrayList<>();
    taskList
      .stream()
      .filter(Objects::nonNull)
      .filter(s -> s.getId() != null)
      .forEach(task -> {
        TaskDTO taskDTO = objectFactory.buildTask(task);
        taskDTOList.add(taskDTO);
      });
    return taskDTOList;
  }

  @Override
  public boolean isModelExist(TaskDTO object) {
    return taskRepository.findById(object.getId()).isPresent();
  }

}
