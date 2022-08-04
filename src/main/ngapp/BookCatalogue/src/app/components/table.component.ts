import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-table',
  template: `
  <ng-container *ngIf="bookList; else loading">
    <table class="table text-center" *ngIf="bookList.length > 0; else noBooks">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Genres</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let book of bookList">
          <td>{{book.title}}</td>
          <td>{{book.author.name + " " + book.author.surname}}</td>
          <td>
            <ng-container *ngFor="let genre of book.genres">
              {{genre.name}}<br />
            </ng-container>
          </td>
          <td class="d-flex justify-content-center align-items-center flex-wrap gap-2">
            <button type="button" class="btn btn-primary" (click)="updateBook(book)">Edit</button>
            <button type="button" class="btn btn-danger" (click)="deleteBook(book)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </ng-container>
  <ng-template #loading>
    <p class="text-center">Loading...</p>
  </ng-template>
  <ng-template #noBooks>
    <p class="text-center fw-bold">There are no books!</p>
  </ng-template>
  `,
  styles: [
  ]
})
export class TableComponent implements OnInit, OnDestroy {
  bookList!: Book[];
  subscription!: Subscription;

  constructor(private bookService: BookService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks();
    this.subscription = this.bookService.getBookListObservable()
      .subscribe((res: Book[]) => {
        this.bookList = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteBook(book: Book): void {
    if (book.id) {
      this.bookService.deleteBook(book.id);
    }
  }

  updateBook(book: Book): void {
    this.modalService.setUpdateForm(book);
    this.modalService.openModal('book');
  }

}
