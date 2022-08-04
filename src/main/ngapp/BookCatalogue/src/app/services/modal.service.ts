import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Form } from '../model/form';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formType: BehaviorSubject<Form> = new BehaviorSubject<Form>('author');
  isUpdate: BehaviorSubject<[boolean, Book | undefined]> = new BehaviorSubject<[boolean, Book | undefined]>([false, undefined]);

  constructor() { }

  getModalObservable(): Observable<boolean> {
    return this.showModal.asObservable();
  }

  getFormObservable(): Observable<Form> {
    return this.formType.asObservable();
  }

  getIsUpdateObservable(): Observable<[boolean, Book | undefined]> {
    return this.isUpdate.asObservable();
  }

  setUpdateForm(book: Book): void {
    this.isUpdate.next([true, book]);
  }

  openModal(formType: Form): void {
    this.formType.next(formType);
    this.showModal.next(true);
  }

  closeModal(): void {
    this.showModal.next(false);
    this.isUpdate.next([false, undefined]);
  }

}
