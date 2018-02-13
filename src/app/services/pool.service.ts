import {
    Injectable
} from '@angular/core';

import {
    IPool
} from "../interfaces/pool.interface";

@Injectable()
export class PoolService {

    constructor() {}

    private mockPoolList: IPool[] = [
        {
            id: 1,
            name: "Mountains Trip",
        },
        {
            id: 2,
            name: "Matt's Birthday Gathering",
        },
    ];

    public getPoolList(): Promise <IPool[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mockPoolList);
        });
    }

    public getPool(id: number): Promise<IPool> {
        const pool: IPool = this.mockPoolList.filter( (pool) => pool.id === id)[0];
        return new Promise((resolve, reject) => {
            resolve(pool);
        });
    }

}
