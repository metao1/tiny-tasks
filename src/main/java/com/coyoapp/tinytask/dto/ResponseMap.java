package com.coyoapp.tinytask.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.lang.Nullable;

@JsonPropertyOrder({"message", "response"})
public class ResponseMap<T> {

  private T response;

  private String message;

  ResponseMap() {
    //empty constructor for the jackson converter
  }

  public ResponseMap(@Nullable T response) {
    this.response = response;
  }

  public T getResponse() {
    return response;
  }

  public ResponseMap(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public ResponseMap(String message, @Nullable T response) {
    this.response = response;
    this.message = message;
  }
}
