import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/takeUntil";

import { FriendService } from "../../services/friend.service";

import { IFriend } from "../../interfaces/friend.interface";

@Component({
  selector: "add-pool",
  templateUrl: "./add-pool.component.html",
  styleUrls: ["./add-pool.component.scss"],
  providers: [FriendService],
})
export class AddPoolComponent implements OnInit {

  friendOption$: BehaviorSubject<IFriend[]> = new BehaviorSubject([]);
  friendSearch$: BehaviorSubject<string> = new BehaviorSubject("");
  private destroy$: Subject<null> = new Subject();

  constructor(
    private friendService: FriendService,
  ) { }

  ngOnInit() {
    this.friendSearch$
      .takeUntil(this.destroy$)
      .debounceTime(500)
      .subscribe( (name: string) => this.getFriendsByName(name));
  }

  addFriend(friend) {
    this.friendSearch$.next(friend.name);
    console.log(friend)
  }

  getFriendsByName(value: string) {
    if (value) {
      this.friendService.searchFriendsByName(value)
        .subscribe( (friends: IFriend[]) => {
          this.friendOption$.next(friends);
        });
    } else {
      this.friendOption$.next([]);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
