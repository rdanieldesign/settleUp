import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { PoolService } from "../services/pool.service";

import { IPool } from "../interfaces/pool.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ PoolService ]
})
export class HomeComponent implements OnInit {

  pools: IPool[];
  private poolSub: Subscription;

  constructor(
    private poolService: PoolService
  ) {}

  ngOnInit() {
    this.poolSub = this.poolService.getPoolList().subscribe((pools: IPool[]): void => {
      this.pools = pools;
    });
  }

  ngOnDestroy() {
    this.poolSub.unsubscribe();
  }

}
