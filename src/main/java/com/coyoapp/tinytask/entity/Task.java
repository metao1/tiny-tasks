package com.coyoapp.tinytask.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.base.Objects;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Table(name = "task")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Task{

  @Id
  @ApiModelProperty(notes = "The database generated task ID")
  @Column(name="id")
  private String id;
  @ApiModelProperty(notes = "The task title", required = true)
  private String title;
  @ApiModelProperty(notes = "The task notes")
  private String notes;
  @ApiModelProperty(notes = "The task description", required = true)
  private Boolean completed;
  private Boolean starred;
  private Boolean important;
  private Boolean deleted;
  private Date startDate;
  private Date dueDate;
  @NonNull
  private String username;

  @JsonIgnore
  @ManyToMany
  @JoinTable(
    name = "task_tag",
    joinColumns = {@JoinColumn(name = "task_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "tag_id", referencedColumnName = "id")})
  @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
  @BatchSize(size = 20)
  private Set<Tag> tags = new HashSet<>();

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

  public Boolean getCompleted() {
    return completed;
  }

  public void setCompleted(Boolean completed) {
    this.completed = completed;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
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

  public Set<Tag> getTags() {
    return tags;
  }

  public void setTags(Set<Tag> tags) {
    this.tags = tags;
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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Task task = (Task) o;
    return Objects.equal(getId(), task.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(getId());
  }

  @Override
  public String toString() {
    return "Task{" +
      "id='" + id + '\'' +
      ", title='" + title + '\'' +
      ", notes='" + notes + '\'' +
      ", completed=" + completed +
      ", starred=" + starred +
      ", important=" + important +
      ", deleted=" + deleted +
      ", startDate=" + startDate +
      ", dueDate=" + dueDate +
      ", username='" + username + '\'' +
      ", tags=" + tags +
      '}';
  }
}
