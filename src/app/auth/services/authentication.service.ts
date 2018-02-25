import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { map } from "rxjs/operators/map";

import { TokenService } from "./token.service";

import { ITokenPayload, ITokenResponse, IUserDetails } from "../../interfaces/auth.interface";

@Injectable()
export class AuthenticationService {

  private api_url: string = "http://localhost:3000/api";
  private currentUser: Subject<IUserDetails> = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  register(user: ITokenPayload): Observable<any> {
    return this.http.post(`${this.api_url}/register`, user)
      .pipe( map((data: ITokenResponse) => {
        if (data.token) {
          this.tokenService.authToken = data.token;
        }
        return data;
      }));
  }

  login(user: ITokenPayload): Observable<any> {
    return this.http.post(`${this.api_url}/login`, user)
      .pipe(map((data: ITokenResponse) => {
        if (data.token) {
          this.tokenService.authToken = data.token;
          this.currentUser.next(this.getUserDetails());
        }
        return data;
      }));
  }

  logout(): void {
    this.tokenService.removeAuthToken();
    this.router.navigateByUrl("/login");
    this.currentUser.next();
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      this.currentUser.next(user);
      return user.exp > Date.now() / 1000;
    } else {
      this.currentUser.next();
      return false;
    }
  }

  getCurrentUser(): Observable<IUserDetails> {
    return this.currentUser.asObservable();
  }

  private getUserDetails(): IUserDetails {
    const token = this.tokenService.authToken;
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

}
