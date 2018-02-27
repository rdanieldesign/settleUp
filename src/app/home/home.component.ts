import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { PoolService } from "../services/pool.service";

import { IPool } from "../interfaces/pool.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ PoolService ]
})
export class HomeComponent implements OnInit {

  pools: IPool[];
  private poolSub: Subscription;
  private newPoolName: string;

  constructor(
    private poolService: PoolService
  ) {}

  ngOnInit() {
    this.poolSub = this.poolService.getPoolList().subscribe((pools: IPool[]): void => {
      this.pools = pools;
    });
  }

  setNewPoolName(value: string): void {
    this.newPoolName = value;
  }

  addPool(): void {
    const addSub: Subscription = this.poolService.addPool({name: this.newPoolName}).subscribe((pool: IPool): void => {
      this.newPoolName = "";
      this.pools.push(pool);
      addSub.unsubscribe();
    });
  }

  deletePool(id: string): void {
    const deleteSub: Subscription = this.poolService.deletePool(id).subscribe((): void => {
      let poolIndex: number;
      for(let i = 0; i <= this.pools.length; i++) {
        if (this.pools[i]._id === id) {
          poolIndex = i;
          break;
        }
      }
      this.pools.splice(poolIndex, 1);
      deleteSub.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.poolSub.unsubscribe();
  }

}
