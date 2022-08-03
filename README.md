# Exercize Spring Angular Book Catalogue 

based on this database :

use bookcatalogue;

CREATE TABLE author ( author_id int unsigned NOT NULL AUTO_INCREMENT, name varchar(20) DEFAULT NULL, surname varchar(20) DEFAULT NULL, PRIMARY KEY (author_id) ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE book ( book_id int unsigned NOT NULL AUTO_INCREMENT, author_id int unsigned NOT NULL, title varchar(20) DEFAULT NULL, PRIMARY KEY (book_id), KEY author_id (author_id), CONSTRAINT author_book FOREIGN KEY (author_id) REFERENCES author (author_id) ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE genre ( genre_id int unsigned NOT NULL AUTO_INCREMENT, name varchar(20) DEFAULT NULL, PRIMARY KEY (genre_id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE book_genre ( book_id int unsigned NOT NULL, genre_id int unsigned NOT NULL, PRIMARY KEY (book_id,genre_id), CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES book (book_id), CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre (genre_id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;