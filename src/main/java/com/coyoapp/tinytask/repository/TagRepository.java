package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, String> {

  Optional<Tag> findByTitle(String title);

  Optional<Tag> findById(String id);
}
