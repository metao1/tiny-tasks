package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.ResponseMap;
import com.coyoapp.tinytask.dto.TagDTO;
import com.coyoapp.tinytask.service.impl.TagService;
import com.coyoapp.tinytask.util.CustomErrorType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/tag", produces = {"application/json"})
@Api(description = "Operations pertaining to tags in TagDTO Management System")
@Data
public class TagController {

  private final TagService tagService;

  @PostMapping
  @ApiOperation(value = "Create a new tag")
  public ResponseEntity<?> createTagDTO(@RequestBody TagDTO tagDTO) {
    ResponseMap<TagDTO> map = new ResponseMap<>("tag", tagDTO);
    if (tagService.isModelExist(tagDTO)) {
      return new ResponseEntity<>(new CustomErrorType("Unable to create tag. "
        + "title " + tagDTO.getTitle() + " already exist"), HttpStatus.CONFLICT);
    }
    tagService.saveOrUpdateModel(tagDTO);
    return new ResponseEntity<>(map, HttpStatus.CREATED);
  }

  @GetMapping
  @ApiOperation(value = "View a list of available tags")
  public ResponseEntity<ResponseMap<List<TagDTO>>> getTagDTOs() {
    ResponseMap<List<TagDTO>> tags = new ResponseMap<>("tags", tagService.getModels());
    if (tags.getResponse().isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(tags, HttpStatus.OK);
  }

  @GetMapping(value = "/{id}")
  @ApiOperation(value = "Get a tag")
  public ResponseEntity<?> getTagDTO(@PathVariable("id") String id) {
    ResponseMap<TagDTO> tag = new ResponseMap<>("tag", tagService.getModel(id));
    if (tag.getResponse() == null) {
      return new ResponseEntity<>(new CustomErrorType("TagDTO with id " + id
        + " not found"), HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(tag, HttpStatus.OK);
  }

  @PutMapping(value = "/{id}")
  @ApiOperation(value = "Update a tag")
  public ResponseEntity<?> updateTagDTO(@PathVariable("id") String id, @RequestBody TagDTO tagDTO) {
    TagDTO currentTagDTO = tagService.getModel(id);
    if (currentTagDTO == null) {
      return new ResponseEntity<>(new CustomErrorType("Unable to update. TagDTO with id "
        + id + " not found"), HttpStatus.NOT_FOUND);
    }
    tagService.saveOrUpdateModel(tagDTO);
    ResponseMap<TagDTO> updatedTagDTO = new ResponseMap<>("tag", tagService.getModel(id));
    return new ResponseEntity<>(updatedTagDTO, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{id}")
  @ApiOperation(value = "Delete a tag")
  public ResponseEntity<?> deleteTagDTO(@PathVariable("id") String id) {
    TagDTO tagDTO = tagService.getModel(id);
    if (tagDTO == null) {
      return new ResponseEntity<>(new CustomErrorType("Unable to delete. "
        + "Tag with id " + id + " not found"), HttpStatus.NOT_FOUND);
    }
    tagService.removeModel(id);
    return new ResponseEntity<TagDTO>(HttpStatus.NO_CONTENT);
  }

}
