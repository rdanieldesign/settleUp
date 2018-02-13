import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PoolService } from "../services/pool.service";

import { IPool } from "../interfaces/pool.interface";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ PoolService ],
})
export class DetailsComponent implements OnInit {
  
  public pool: IPool;
  private routeSub: Subscription;
  private poolId: number;

  constructor(
    private route: ActivatedRoute,
    private poolService: PoolService,
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( (params) => this.poolId = parseInt(params.id, 10));
    this.poolService.getPool(this.poolId).then( (pool: IPool) => {
      this.pool = pool;
      console.log(this.pool);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
