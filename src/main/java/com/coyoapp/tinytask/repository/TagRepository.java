package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, String> {

  Optional<Tag> findByTitle(String title);

  Optional<Tag> findById(String id);
}
