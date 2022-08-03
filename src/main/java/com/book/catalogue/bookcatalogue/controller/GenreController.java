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

import com.book.catalogue.bookcatalogue.model.Genre;
import com.book.catalogue.bookcatalogue.repository.GenreRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class GenreController {
	@Autowired
	GenreRepository genreRepository;

	@GetMapping("/genre")
	public ResponseEntity<List<Genre>> getAllGenres() {
		try {
			List<Genre> genres = new ArrayList<Genre>();
			genreRepository.findAll().forEach(genres::add);
			if (genres.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(genres, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/genre/{id}")
	public ResponseEntity<Genre> getGenreById(@PathVariable("id") int id) {
		Optional<Genre> genreData = genreRepository.findById(id);
		if (genreData.isPresent()) {
			return new ResponseEntity<>(genreData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/genre")
	public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
		try {
			Genre _genre = genreRepository.save(genre);
			return new ResponseEntity<>(_genre, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/genre/{id}")
	public ResponseEntity<Genre> updateGenre(@PathVariable("id") int id, @RequestBody Genre genre) {
		Optional<Genre> genreData = genreRepository.findById(id);
		if (genreData.isPresent()) {
			Genre _genre = genreData.get();
			_genre.setBooks(genre.getBooks());
			_genre.setName(genre.getName());
			return new ResponseEntity<>(genreRepository.save(_genre), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/genre/{id}")
	public ResponseEntity<HttpStatus> deleteGenre(@PathVariable("id") int id) {
		try {
			genreRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
