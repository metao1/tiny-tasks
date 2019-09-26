package com.coyoapp.tinytask.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

import java.util.Date;
import java.util.Set;

public class TaskDTO {

  @JsonProperty("id")
  private String id;
  private String title;
  private String notes;
  private boolean completed;
  private boolean starred;
  private boolean important;
  private boolean deleted;
  private Date startDate;
  private Date dueDate;
  private String username;//the username who owns the task
  private Set<TagDTO> tags;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    TaskDTO taskDTO = (TaskDTO) o;
    return Objects.equal(getId(), taskDTO.getId()) &&
      Objects.equal(getUsername(), taskDTO.getUsername());
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(getId(), getUsername());
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public Boolean getCompleted() {
    return completed;
  }

  public void setCompleted(Boolean completed) {
    this.completed = completed;
  }

  public Boolean getStarred() {
    return starred;
  }

  public void setStarred(Boolean starred) {
    this.starred = starred;
  }

  public Boolean getImportant() {
    return important;
  }

  public void setImportant(Boolean important) {
    this.important = important;
  }

  public Boolean getDeleted() {
    return deleted;
  }

  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }

  public Set<TagDTO> getTags() {
    return tags;
  }

  public void setTags(Set<TagDTO> tags) {
    this.tags = tags;
  }

  public boolean isCompleted() {
    return completed;
  }

  public boolean isStarred() {
    return starred;
  }

  public boolean isImportant() {
    return important;
  }

  public boolean isDeleted() {
    return deleted;
  }

  public void setCompleted(boolean completed) {
    this.completed = completed;
  }

  public void setStarred(boolean starred) {
    this.starred = starred;
  }

  public void setImportant(boolean important) {
    this.important = important;
  }

  public void setDeleted(boolean deleted) {
    this.deleted = deleted;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getDueDate() {
    return dueDate;
  }

  public void setDueDate(Date dueDate) {
    this.dueDate = dueDate;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
