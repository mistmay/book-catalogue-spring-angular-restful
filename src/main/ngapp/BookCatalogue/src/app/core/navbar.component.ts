import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <header>
    <nav class="bg-primary px-3 py-2 h-100 d-flex align-items-center">
      <h1 class="text-white fw-bold fs-2">Book Catalogue</h1>
    </nav>
  </header>
  `,
  styles: [`
    header {
      height: 80px;
    }
  `]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
