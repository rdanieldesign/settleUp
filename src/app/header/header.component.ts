import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { AuthenticationService } from "../auth/services/authentication.service";
import { IUserDetails } from "../interfaces/auth.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  currentUser: IUserDetails;
  currentUserSubscription: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.currentUser$.subscribe( (user: IUserDetails): void => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestryoy() {
    this.currentUserSubscription.unsubscribe();
  }

}
