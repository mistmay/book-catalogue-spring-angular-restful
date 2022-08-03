import { Component, OnInit } from '@angular/core';
import { Form } from '../model/form';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-main-page',
  template: `
  <section class="px-2 py-5">
    <div class="container bg-white rounded p-5 shadow border border-secondary d-flex flex-column align-items-center gap-5">
      <h1 class="fs-1 fw-bold text-center">Book Catalogue</h1>
      <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">
        <button type="button" class="btn btn-primary" (click)="openForm('author')">Add Author</button>
        <button type="button" class="btn btn-primary" (click)="openForm('genre')">Add Genre</button>
        <button type="button" class="btn btn-primary" (click)="openForm('book')">Add Book</button>
      </div>
      <app-table></app-table>
    </div>
  </section>
  `,
  styles: [
  ]
})
export class MainPageComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openForm(formType: Form) {
    this.modalService.openModal(formType);
  }

}
