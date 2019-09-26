package com.coyoapp.tinytask.handler;

import com.coyoapp.tinytask.controller.TaskController;
import com.coyoapp.tinytask.dto.ApiError;
import com.coyoapp.tinytask.exception.NotFoundException;
import com.coyoapp.tinytask.exception.TaskException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@ControllerAdvice(assignableTypes = TaskController.class)
@RequestMapping(produces = "application/vnd.error+jsonhateoas")
public class RestResponseEntityExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiError> notFoundException(final NotFoundException e) {
    return error(e, HttpStatus.NOT_FOUND, e.getMessage());
  }

  @ExceptionHandler(TaskException.class)
  public ResponseEntity<ApiError> serverExceptionHandler(final TaskException e) {
    return error(e, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
  }

  private ResponseEntity<ApiError> error(final Exception exception, final HttpStatus httpStatus, final String logRef) {
    final String message = Optional.of(exception.getMessage()).orElse(exception.getClass().getSimpleName());
    return new ResponseEntity<>(new ApiError(httpStatus, message), httpStatus);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiError> assertionException(final IllegalArgumentException exception) {
    final String message = Optional.of(exception.getMessage()).orElse(exception.getClass().getSimpleName());
    return error(exception, HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
