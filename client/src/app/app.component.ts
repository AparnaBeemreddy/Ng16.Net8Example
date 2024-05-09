import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { LoginComponent } from './login/login.component';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent, WeatherComponent, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = '.Net Web Application with Angular, Web API, & MS SQL';
  users: any;
  isLoggedIn = false;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.appService.getUsers().subscribe(response => {
      this.users = response;
    });
  }
}
