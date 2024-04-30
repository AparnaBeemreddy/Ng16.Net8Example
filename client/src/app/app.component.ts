import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { UserDTO } from './dtos/user.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Sample App with Angular 16 and .NET 8';
  users: any;
  user = new User();

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  ngOnInit(): void {
    // this.http.get("https://localhost:5200/api/user").subscribe({
    //   next: response => this.users = response,
    //   error: error => console.log(error),
    //   complete: () => console.log("Request has completed")
    // });
  }

  register(userDTO: UserDTO) {
    this.authService.register(userDTO).subscribe();
  }

  login(userDTO: UserDTO) {
    this.authService.login(userDTO).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }

  getMe() {
    this.authService.getMe().subscribe((name: string) => {
      console.log('Name: ' + name);
    });
  }
}
