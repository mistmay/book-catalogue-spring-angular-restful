import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BookService } from '../services/book.service';
import { ModalService } from '../services/modal.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Book } from '../model/book';
import { Author } from '../model/author';
import { Genre } from '../model/genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-book',
  template: `
  <ng-container *ngIf="isUpdate && authorsList && genresList">
    <form *ngIf="authorsList.length > 0 && genresList.length > 0; else noForm" class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" [formGroup]="form">

    </form>
  </ng-container>
  <ng-template #noForm>
    <p class="text-center">You need to add at least one author and one genre in order to add a new book</p>
  </ng-template>
  `,
  styles: [
  ]
})
export class FormBookComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isUpdate!: [boolean, Book | null];
  authorsList!: Author[];
  genresList!: Genre[];
  subscriptions: Subscription[] = [];

  constructor(private api: ApiService, private bookService: BookService, private modalService: ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscriptions.push(this.api.getAllAuthors()
      .subscribe((res: Author[]) => {
        this.authorsList = res;
      }));
    this.subscriptions.push(this.api.getAllGenres()
      .subscribe((res: Genre[]) => {
        this.genresList = res;
      }));
    this.subscriptions.push(this.modalService.getIsUpdateObservable()
      .subscribe((res: [boolean, Book | null]) => {
        this.isUpdate = res;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
