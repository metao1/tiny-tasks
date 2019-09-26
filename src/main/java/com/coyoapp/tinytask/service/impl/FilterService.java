package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.dto.FilterDTO;
import com.coyoapp.tinytask.dto.ObjectFactory;
import com.coyoapp.tinytask.entity.Filter;
import com.coyoapp.tinytask.exception.NotFoundException;
import com.coyoapp.tinytask.repository.FilterRepository;
import com.coyoapp.tinytask.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class FilterService implements GeneralService<FilterDTO> {


  @Autowired
  private FilterRepository filterRepository;

  @Autowired
  private ObjectFactory objectFactory;

  @Override
  public FilterDTO saveOrUpdateModel(FilterDTO object) {
    Filter filter = objectFactory.buildFilter(object);
    Filter savedFilter = filterRepository.save(filter);
    return objectFactory.buildFilter(savedFilter);
  }

  @Override
  public FilterDTO getModel(String id) {
    return filterRepository.findById(id)
      .map(filter -> objectFactory.buildFilter(filter))
      .orElseThrow(() -> new NotFoundException(
        String.format("the expected %s filter", id)));
  }

  @Override
  public void removeModel(String id) {
    filterRepository.deleteById(id);
  }

  @Override
  public List<FilterDTO> getModels() {
    List<Filter> filterList = filterRepository.findAll();
    List<FilterDTO> filterDTOList = new ArrayList<>();
    filterList
      .stream()
      .filter(Objects::nonNull)
      .filter(s -> s.getId() != null)
      .forEach(filter -> {
        FilterDTO filterDTO = objectFactory.buildFilter(filter);
        filterDTOList.add(filterDTO);
      });
    return filterDTOList;
  }

  @Override
  public boolean isModelExist(FilterDTO object) {
    return filterRepository.findById(object.getId()).isPresent();
  }

}
