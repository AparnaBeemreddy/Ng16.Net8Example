import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { UserDTO } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(userDTO: UserDTO): Observable<UserModel> {
    return this.http.post<UserModel>('https://localhost:5200/api/auth/register', userDTO);
  }

  public login(userDTO: UserDTO): Observable<string> {
    return this.http.post('https://localhost:5200/api/auth/login', userDTO,
      { responseType: 'text' });
  }

  public getMe(): Observable<string> {
    return this.http.get('https://localhost:5200/api/user/get-me', { responseType: 'text' });
  }
}
