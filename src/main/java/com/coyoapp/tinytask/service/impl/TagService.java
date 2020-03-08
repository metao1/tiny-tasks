package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.dto.ObjectFactory;
import com.coyoapp.tinytask.dto.TagDTO;
import com.coyoapp.tinytask.entity.Tag;
import com.coyoapp.tinytask.exception.NotFoundException;
import com.coyoapp.tinytask.repository.TagRepository;
import com.coyoapp.tinytask.service.GeneralService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TagService implements GeneralService<TagDTO> {

  private final TagRepository tagRepository;
  private final ObjectFactory objectFactory;

  @Override
  public TagDTO saveOrUpdateModel(TagDTO object) {
    Tag tag = objectFactory.buildTag(object);
    Tag savedTag = tagRepository.save(tag);
    return objectFactory.buildTag(savedTag);
  }

  @Override
  public TagDTO getModel(String id) {
    return tagRepository.findById(id)
      .map(tag -> objectFactory.buildTag(tag))
      .orElseThrow(() -> new NotFoundException(
        String.format("the expected %s tag", id)));
  }

  @Override
  public void removeModel(String id) {
    tagRepository.deleteById(id);
  }

  @Override
  public List<TagDTO> getModels() {
    List<Tag> tagList = tagRepository.findAll();
    List<TagDTO> tagDTOList = new ArrayList<>();
    tagList
      .stream()
      .filter(Objects::nonNull)
      .filter(s -> s.getId() != null)
      .forEach(tag -> {
        TagDTO tagDTO = objectFactory.buildTag(tag);
        tagDTOList.add(tagDTO);
      });
    return tagDTOList;
  }

  @Override
  public boolean isModelExist(TagDTO object) {
    return tagRepository.findById(object.getId()).isPresent();
  }

}
