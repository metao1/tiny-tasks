package com.coyoapp.tinytask.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

public class FilterDTO {

  @JsonProperty("id")
  private String id;
  @JsonProperty("handle")
  private String handle;
  @JsonProperty("title")
  private String title;
  @JsonProperty("icon")
  private String icon;


  public FilterDTO(){
    //empty constructor
  }

  public FilterDTO(String id, String handle, String title, String icon) {
    this.id = id;
    this.handle = handle;
    this.title = title;
    this.icon = icon;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    FilterDTO filterDTO = (FilterDTO) o;
    return Objects.equal(getTitle(), filterDTO.getTitle());
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(getTitle());
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

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }
}
