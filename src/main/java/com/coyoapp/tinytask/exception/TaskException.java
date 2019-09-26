package com.coyoapp.tinytask.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class TaskException extends RuntimeException {

  public TaskException(final String message){
    super(message);
  }

}
