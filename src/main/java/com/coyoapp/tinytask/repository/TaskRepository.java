package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, String> {

  @Override
  Optional<Task> findById(String id);

}
