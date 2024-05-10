import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent,
    WeatherComponent, HeaderComponent, FooterComponent, SideNavComponent]
})
export class AppComponent {
  users: any;
  isLoggedIn = false;

  constructor() {
  }
}
