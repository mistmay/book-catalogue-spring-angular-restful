package com.book.catalogue.bookcatalogue.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.catalogue.bookcatalogue.model.Author;
import com.book.catalogue.bookcatalogue.repository.AuthorRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthorController {
	@Autowired
	AuthorRepository authorRepository;

	@GetMapping("/author")
	public ResponseEntity<List<Author>> getAllAuthors() {
		try {
			List<Author> authors = new ArrayList<Author>();
			authorRepository.findAll().forEach(authors::add);
			if (authors.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(authors, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/author/{id}")
	public ResponseEntity<Author> getAuthorById(@PathVariable("id") int id) {
		Optional<Author> authorData = authorRepository.findById(id);
		if (authorData.isPresent()) {
			return new ResponseEntity<>(authorData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/author")
	public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
		try {
			Author _author = authorRepository.save(author);
			return new ResponseEntity<>(_author, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/author/{id}")
	public ResponseEntity<Author> updateAuthor(@PathVariable("id") int id, @RequestBody Author author) {
		Optional<Author> authorData = authorRepository.findById(id);
		if (authorData.isPresent()) {
			Author _author = authorData.get();
			_author.setName(author.getName());
			_author.setSurname(author.getSurname());
			_author.setBooks(author.getBooks());
			return new ResponseEntity<>(authorRepository.save(_author), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/author/{id}")
	public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") int id) {
		try {
			authorRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
