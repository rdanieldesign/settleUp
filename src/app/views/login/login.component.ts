import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../auth/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginEnabled = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  setEmail(email: string): void {
    this.email = email;
    this.loginEnabled = this.getIsLoginEnabled();
  }

  setPassword(password: string): void {
    this.password = password;
    this.loginEnabled = this.getIsLoginEnabled();
  }

  login(): void {
    const { email , password } = this;
    this.authService.login({email, password}).subscribe((): void => {
      this.router.navigateByUrl("/home");
    });
  }

  private getIsLoginEnabled(): boolean {
    return Boolean(this.password && this.email);
  }

}
