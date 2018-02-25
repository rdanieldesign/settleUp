import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {

  private token: string;

  constructor() { }

  get authToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("auth-token");
    }
    return this.token;
  }

  set authToken(token: string) {
    localStorage.setItem("auth-token", token);
    this.token = token;
  }

  removeAuthToken(): void {
    this.token = "";
    window.localStorage.removeItem("auth-token");
  }

}
