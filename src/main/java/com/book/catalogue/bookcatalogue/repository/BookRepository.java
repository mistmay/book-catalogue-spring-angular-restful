package com.book.catalogue.bookcatalogue.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.book.catalogue.bookcatalogue.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
