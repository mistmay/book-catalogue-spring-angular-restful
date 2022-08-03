package com.book.catalogue.bookcatalogue.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.book.catalogue.bookcatalogue.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

}
