package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.FilterDTO;
import com.coyoapp.tinytask.dto.ResponseMap;
import com.coyoapp.tinytask.service.impl.FilterService;
import com.coyoapp.tinytask.util.CustomErrorType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/filter", produces = {"application/json"})
@Api(description = "Operations pertaining to filters in FilterDTO Management System")
public class FilterController {

  @Autowired
  private FilterService filterService;

  @PostMapping
  @ApiOperation(value = "Create a new filter")
  public ResponseEntity<?> createFilterDTO(@RequestBody FilterDTO filterDTO) {
    ResponseMap<FilterDTO> map = new ResponseMap<>("filter", filterDTO);
    if (filterService.isModelExist(filterDTO)) {
      return new ResponseEntity<>(new CustomErrorType("Unable to create filter. "
        + "title " + filterDTO.getTitle() + " already exist"), HttpStatus.CONFLICT);
    }
    filterService.saveOrUpdateModel(filterDTO);
    return new ResponseEntity<>(map, HttpStatus.CREATED);
  }

  @GetMapping
  @ApiOperation(value = "View a list of available filters")
  public ResponseEntity<ResponseMap<List<FilterDTO>>> getFilterDTOs() {
    ResponseMap<List<FilterDTO>> filters = new ResponseMap<>("filters", filterService.getModels());
    if (filters.getResponse().isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(filters, HttpStatus.OK);
  }

  @GetMapping(value = "/{id}")
  @ApiOperation(value = "Get a filter")
  public ResponseEntity<?> getFilterDTO(@PathVariable("id") String id) {
    ResponseMap<FilterDTO> filter = new ResponseMap<>("filter", filterService.getModel(id));
    if (filter.getResponse() == null) {
      return new ResponseEntity<>(new CustomErrorType("FilterDTO with id " + id
        + " not found"), HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(filter, HttpStatus.OK);
  }

  @PutMapping(value = "/{id}")
  @ApiOperation(value = "Update a filter")
  public ResponseEntity<?> updateFilterDTO(@PathVariable("id") String id, @RequestBody FilterDTO filterDTO) {
    FilterDTO currentFilterDTO = filterService.getModel(id);
    if (currentFilterDTO == null) {
      return new ResponseEntity<>(new CustomErrorType("Unable to update. FilterDTO with id "
        + id + " not found"), HttpStatus.NOT_FOUND);
    }
    filterService.saveOrUpdateModel(filterDTO);
    ResponseMap<FilterDTO> updatedFilterDTO = new ResponseMap<>("filter", filterService.getModel(id));
    return new ResponseEntity<>(updatedFilterDTO, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{id}")
  @ApiOperation(value = "Delete a filter")
  public ResponseEntity<?> deleteFilterDTO(@PathVariable("id") String id) {
    FilterDTO filterDTO = filterService.getModel(id);
    if (filterDTO == null) {
      return new ResponseEntity<>(new CustomErrorType("Unable to delete. "
        + "Filter with id " + id + " not found"), HttpStatus.NOT_FOUND);
    }
    filterService.removeModel(id);
    return new ResponseEntity<FilterDTO>(HttpStatus.NO_CONTENT);
  }

}
