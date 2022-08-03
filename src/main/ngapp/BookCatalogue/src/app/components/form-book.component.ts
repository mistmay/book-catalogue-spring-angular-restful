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
  <ng-container *ngIf="isUpdate && authorsList && genresList; else loading">
    <form *ngIf="authorsList.length > 0 && genresList.length > 0; else noForm" class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" [formGroup]="form" (ngSubmit)="addBook()">
      <h3 class="fw-bold">Add New Book:</h3>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <label for="title">Title:</label>
        <span class="text-danger" *ngIf="form.controls['title'].dirty && form.hasError('required', 'title')">*Required<br></span>
        <span class="text-danger" *ngIf="form.controls['title'].dirty && form.hasError('minlength', 'title')">At least 3 characters<br></span>
        <input type="text" id="title" placeholder="Title" formControlName="title" class="rounded p-2" [value]="isUpdate[0] && isUpdate[1] ? isUpdate[1].title : ''">
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <label for="author">Author:</label>
        <span class="text-danger" *ngIf="form.controls['author'].dirty && form.hasError('required', 'author')">*Required<br></span>
        <select id="author" formControlName="author" class="rounded p-2" [value]="isUpdate[0] && isUpdate[1] ? isUpdate[1].author.id : ''">
          <option *ngFor="let author of authorsList" [value]="author.id">{{author.name + " " + author.surname}}</option>
        </select>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <h4 class="text-center fw-bold">Genres</h4>
        <span class="text-danger" *ngIf="form.controls['genre'].dirty && form.hasError('required', 'genre')">*Required<br></span>
        <div *ngFor="let genre of genresList" class="d-flex align-items-center gap-2 flex-wrap">
          <label for="{{genre.name}}">{{genre.name}}</label>
          <input type="checkbox" formControlName="genre" [value]="genre.id" [id]="genre.name" [checked]="checkToCheck(genre)">
        </div>
      </div>
      <button *ngIf="isUpdate[0]" type="submit" [disabled]="form.invalid" class="btn btn-primary">Update Book</button>
      <button *ngIf="!isUpdate[0]" type="submit" [disabled]="form.invalid" class="btn btn-primary">Add Book</button>
    </form>
  </ng-container>
  <ng-template #noForm>
    <p class="text-center fw-bold">You need to add at least one author and one genre in order to add a new book</p>
  </ng-template>
  <ng-template #loading>
  <p class="text-center">Loading...</p>
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
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      author: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  checkToCheck(genre: Genre): boolean {
    if (this.isUpdate[0] && this.isUpdate[1]) {
      return !!this.isUpdate[1].genres.find((current: Genre) => current.id === genre.id);
    } else {
      return false;
    }
  }

  addBook(): void {
    const currentGenres: Genre[] = [];
    this.subscriptions.push(this.api.getAllGenres()
      .subscribe((res: Genre[]) => {
        res.forEach((element: Genre) => {
          this.form.value.genre.forEach((id: string) => {
            if (Number(id) === element.id) {
              currentGenres.push(element);
            }
          });
          this.subscriptions.push(this.api.getAuthorById(Number(this.form.value.author))
            .subscribe((author: Author) => {
              if (this.isUpdate[0] && this.isUpdate[1] && this.isUpdate[1].id) {
                this.bookService.updateBook(this.isUpdate[1].id, { title: this.form.value.title, author: author, genres: currentGenres });
              } else {
                this.bookService.addBook({ title: this.form.value.title, author: author, genres: currentGenres });
              }
              this.form.reset();
              this.modalService.closeModal();
            }));
        });
      }));
  }

}
