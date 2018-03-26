import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { IFriend } from "../interfaces/friend.interface"

@Injectable()
export class FriendService {

  api_url = "http://localhost:3000";
  friendlUrl = `${this.api_url}/api/friends`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllFriends(): Observable<IFriend[]> {
    return this.http.get(this.friendlUrl)
      .map((response: Response) => {
        return response["data"] as IFriend[];
      });
  }

  searchFriendsByName(value: string): Observable<IFriend[]> {
    return this.http.get(`${this.friendlUrl}?search=${value}`)
      .map((response: Response) => {
        return response["data"] as IFriend[];
      });
  }
}
