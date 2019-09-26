package com.coyoapp.tinytask.dto;

import com.google.common.base.Objects;

public class TagDTO {

  private String id;

  private String handle;

  private String title;

  private String color;

  public TagDTO(){

  }

  public TagDTO(String id, String handle, String title, String color) {
    this.id = id;
    this.handle = handle;
    this.title = title;
    this.color = color;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getHandle() {
    return handle;
  }

  public void setHandle(String handle) {
    this.handle = handle;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    TagDTO tagDTO = (TagDTO) o;
    return Objects.equal(getTitle(), tagDTO.getTitle());
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(getTitle());
  }
}
