import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { TopHeaderComponent } from "./shared/top-header/top-header.component";
import { WeatherComponent } from './weather/weather.component';
import { ContainerComponent } from "./container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent,
    WeatherComponent, HeaderComponent, FooterComponent, SideNavComponent, TopHeaderComponent, ContainerComponent]
})
export class AppComponent {
  users: any;
  isLoggedIn = false;

  constructor() {
  }
}
