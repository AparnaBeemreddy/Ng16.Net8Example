import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserDTO } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(userDTO: UserDTO): Observable<User> {
    return this.http.post<User>("https://localhost:5200/api/auth/register", userDTO);
  }

  public login(userDTO: UserDTO): Observable<string> {
    return this.http.post("https://localhost:5200/api/auth/login", userDTO, 
    { responseType: 'text' });
  }

  public getMe(): Observable<string> {
    return this.http.get("https://localhost:5200/api/user/get-me", { responseType: 'text' });
  }
}
