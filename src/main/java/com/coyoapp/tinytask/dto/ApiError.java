package com.coyoapp.tinytask.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Getter
public class ApiError {

  @JsonProperty
  private HttpStatus status;
  @JsonFormat(shape = JsonFormat.Shape.NUMBER)
  private Date timestamp;
  @Length(min = 0, max = 255)
  private String message;

  private ApiError() {
    timestamp = new Date();
  }

  public ApiError(HttpStatus status) {
    this();
    this.status = status;
  }

  public ApiError(HttpStatus status, String ex) {
    this();
    this.status = status;
    this.message = ex;
  }

  public ApiError(HttpStatus status, String message, Throwable ex) {
    this();
    this.status = status;
    this.message = message;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }
}
