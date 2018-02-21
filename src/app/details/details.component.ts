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
  
  pool: IPool;
  ready: boolean = false;
  private routeSub: Subscription;
  private poolId: string;

  constructor(
    private route: ActivatedRoute,
    private poolService: PoolService,
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe( (params) => this.poolId = params.id);
    this.poolService.getPool(this.poolId).subscribe( (pool: IPool) => {
      this.pool = pool;
      this.ready = true;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
