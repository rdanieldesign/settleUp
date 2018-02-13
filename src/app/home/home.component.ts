import { Component, OnInit } from '@angular/core';

import { PoolService } from "../services/pool.service";

import { IPool } from "../interfaces/pool.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ PoolService ]
})
export class HomeComponent implements OnInit {

  public pools: IPool[];

  constructor(
    private poolService: PoolService
  ) {}

  ngOnInit() {
    this.poolService.getPoolList().then((pools: IPool[]): void => {
      this.pools = pools;
    });
  }

}
