import { Component } from '@angular/core';
import { UserDTO } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userModel = new UserModel();

  constructor(private authService: AuthService) {
  }

  register(userDTO: UserDTO) {
    this.authService.register(userDTO).subscribe();
  }

  login(userDTO: UserDTO) {
    this.authService.login(userDTO).subscribe((token: string) => {
      //localStorage.setItem('authToken', token);
      //this.isLoggedIn = true;
      //this.getUsers();
    });
  }

  getMe() {
    this.authService.getMe().subscribe((name: string) => {
      console.log('Name: ' + name);
    });
  }
}
