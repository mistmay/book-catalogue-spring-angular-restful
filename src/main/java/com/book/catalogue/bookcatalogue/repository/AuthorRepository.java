package com.book.catalogue.bookcatalogue.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.book.catalogue.bookcatalogue.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer> {

}
