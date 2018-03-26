import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { map } from "rxjs/operators/map";

import { TokenService } from "./token.service";

import { ITokenPayload, ITokenResponse, IUserDetails } from "../../interfaces/auth.interface";

@Injectable()
export class AuthenticationService {

  private api_url = "http://localhost:3000/api";
  private _currentUser: BehaviorSubject<IUserDetails> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  get currentUser$(): BehaviorSubject<IUserDetails> {
    return this._currentUser;
  }

  set currentUser$(user) {
    throw new Error("Cannot set current user object directly");
  }

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
          this._currentUser.next(this.getUserDetails());
        }
        return data;
      }));
  }

  logout(): void {
    this.tokenService.removeAuthToken();
    this.router.navigateByUrl("/login");
    this._currentUser.next(null);
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      this._currentUser.next(user);
      return user.exp > Date.now() / 1000;
    } else {
      this._currentUser.next(null);
      return false;
    }
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
