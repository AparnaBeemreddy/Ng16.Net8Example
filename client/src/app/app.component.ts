import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { TopHeaderComponent } from "./shared/top-header/top-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, FormsModule,
    HeaderComponent, FooterComponent, TopHeaderComponent]
})
export class AppComponent {
  users: any;
  isLoggedIn = false;

  constructor() {
  }
}
