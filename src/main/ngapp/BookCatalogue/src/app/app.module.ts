import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar.component';
import { ModalComponent } from './core/modal.component';
import { TableComponent } from './components/table.component';
import { MainPageComponent } from './views/main-page.component';
import { FormAuthorComponent } from './components/form-author.component';
import { FormBookComponent } from './components/form-book.component';
import { FormGenreComponent } from './components/form-genre.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalComponent,
    TableComponent,
    MainPageComponent,
    FormAuthorComponent,
    FormBookComponent,
    FormGenreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
