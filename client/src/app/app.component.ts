import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { LoginComponent } from "./login/login.component";
import { WeatherComponent } from "./weather/weather.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent, WeatherComponent]
})
export class AppComponent implements OnInit {
  title = '.Net Web Application with Angular';
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
