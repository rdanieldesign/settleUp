import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { PoolService } from "../../services/pool.service";
import { FriendService } from "../../services/friend.service";
import { AuthenticationService } from "../../auth/services/authentication.service";

import { IPool, INewPool } from "../../interfaces/pool.interface";
import { IFriend } from "../../interfaces/friend.interface"; 
import { IUserDetails } from "../../interfaces/auth.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ PoolService, FriendService ]
})
export class HomeComponent implements OnInit {

  pools: IPool[];
  friends: IFriend[];
  private newPoolName: string;
  private currentUser: IUserDetails;
  private destroy$: Subject<null> = new Subject();

  constructor(
    private poolService: PoolService,
    private friendService: FriendService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.poolService.getPoolList().subscribe((pools: IPool[]) => this.pools = pools);
    this.friendService.getAllFriends().subscribe((friends: IFriend[]) => this.friends = friends);
    this.authService.currentUser$
      .takeUntil(this.destroy$)
      .subscribe( (user: IUserDetails) => {
        this.currentUser = user;
      });
  }

  setNewPoolName(value: string): void {
    this.newPoolName = value;
  }

  goToAddPool(): void {
    this.router.navigateByUrl("/add-pool");
  }

  // TODO move to add pool view
  addPool(): void {
    const newPool: INewPool = {
      name: this.newPoolName,
      creator: this.currentUser._id,
    };
    this.poolService.addPool(newPool).subscribe((pool: IPool): void => {
      this.newPoolName = "";
      this.pools.push(pool);
    });
  }

  deletePool(id: string): void {
    this.poolService.deletePool(id).subscribe((): void => {
      let poolIndex: number;
      for (let i = 0; i <= this.pools.length; i++) {
        if (this.pools[i]._id === id) {
          poolIndex = i;
          break;
        }
      }
      this.pools.splice(poolIndex, 1);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
