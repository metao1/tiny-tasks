package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.entity.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FilterRepository extends JpaRepository<Filter, String> {

  Optional<Filter> findByTitle(String title);

  Optional<Filter> findById(String id);
}
