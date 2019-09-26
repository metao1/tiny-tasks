package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.ResponseMap;
import com.coyoapp.tinytask.dto.TaskDTO;
import com.coyoapp.tinytask.entity.Task;
import com.coyoapp.tinytask.service.impl.TaskService;
import com.coyoapp.tinytask.util.CustomErrorType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/task", produces = {"application/json"})
@Api(description = "Operations pertaining to tasks in Task Management System")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping
  @ApiOperation(value = "Create a new task")
  public ResponseEntity<?> createTask(@RequestBody TaskDTO task) {
    ResponseMap<TaskDTO> map = new ResponseMap<>("task", task);
    if (taskService.isModelExist(task)) {
      return new ResponseEntity<>(new CustomErrorType("Unable to create task. "
        + "task with id: " + task.getId() + " already exist"), HttpStatus.CONFLICT);
    }
    taskService.saveOrUpdateModel(task);
    return new ResponseEntity<>(map, HttpStatus.CREATED);
  }

  @GetMapping
  @ApiOperation(value = "View a list of available tasks")
  public ResponseEntity<ResponseMap<List<TaskDTO>>> getTasks() {
    ResponseMap<List<TaskDTO>> tasks = new ResponseMap<>("tasks", taskService.getModels());
    if (tasks.getResponse().isEmpty()) {
      tasks = new ResponseMap<>("tasks", new ArrayList<>());
      return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    return new ResponseEntity<>(tasks, HttpStatus.OK);
  }

  @GetMapping(value = "/{id}")
  @ApiOperation(value = "Get a task")
  public ResponseEntity<?> getTask(@PathVariable("id") String id) {
    ResponseMap<TaskDTO> task = new ResponseMap<>("task", taskService.getModel(id));
    if (task.getResponse() == null) {
      return new ResponseEntity<>(new CustomErrorType("Task with id " + id
        + " not found"), HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(task, HttpStatus.OK);
  }

  @PutMapping(value = "/{id}")
  @ApiOperation(value = "Update a task")
  public ResponseEntity<?> updateTask(@PathVariable("id") String id, @RequestBody TaskDTO taskDTO) {
    TaskDTO currentTask = taskService.getModel(id);
    if (currentTask == null) {
      return new ResponseEntity<>(new CustomErrorType("Unable to update. Task with id "
        + id + " not found"), HttpStatus.NOT_FOUND);
    }
    taskService.saveOrUpdateModel(taskDTO);
    ResponseMap<TaskDTO> updatedTask = new ResponseMap<>("task", taskService.getModel(id));
    return new ResponseEntity<>(updatedTask, HttpStatus.OK);
  }

  @DeleteMapping(value = "/{id}")
  @ApiOperation(value = "Delete a task")
  public ResponseEntity<?> deleteTask(@PathVariable("id") String id) {

    TaskDTO task = taskService.getModel(id);
    if (task == null) {
      return new ResponseEntity<>(new CustomErrorType("Unable to delete. "
        + "Task with id " + id + " not found"), HttpStatus.NOT_FOUND);
    }
    taskService.removeModel(id);
    return new ResponseEntity<Task>(HttpStatus.NO_CONTENT);
  }

}
