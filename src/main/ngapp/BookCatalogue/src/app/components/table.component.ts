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
    this.subscription = this.bookService.getBookListObservable()
      .subscribe((res: Book[]) => {
        this.bookList = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
  }

  updateBook(book: Book): void {
    this.modalService.setUpdateForm(book);
    this.modalService.openModal('book');
  }

}
