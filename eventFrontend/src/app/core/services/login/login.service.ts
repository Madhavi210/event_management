import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  private token?: string | null = null;
  private userId?: string | null = null;
  private isAuthenticated: boolean = false;
  private apiUrl = 'http://localhost:3000/api/user'; 

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: { userId: string, token: string }) => {
        if (response) {
          this.token = response.token;
          this.userId = response.userId;
          localStorage.setItem("token", this.token);
          localStorage.setItem("userId", this.userId);
          this.isAuthenticated = true;
          console.log(this.token, this.userId, this.isAuthenticated);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!this.getToken();
  }

  logout(): void {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
