import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { IPool, INewPool } from "../interfaces/pool.interface";

@Injectable()
export class PoolService {

    api_url = "http://localhost:3000";
    poolUrl = `${this.api_url}/api/pools`;

    constructor(
        private http: HttpClient
    ) {}

    public getPoolList(): Observable<IPool[]> {
        return this.http.get(this.poolUrl)
            .map( (response: Response) => {
                return response["data"].docs as IPool[];
            });
    }

    public getPool(id: string): Observable<IPool> {
        return this.http.get(`${this.poolUrl}/${id}`)
            .map((response: Response) => {
                return response["data"] as IPool;
            });
    }

    public addPool(pool: INewPool): Observable<IPool> {
        return this.http.post(this.poolUrl, pool)
            .map( (response: Response) => {
                return response["data"] as IPool;
            });
    }

    public updatePool(pool: IPool): Observable<IPool> {
        return this.http.put(`${this.poolUrl}/${pool._id}`, pool)
            .map((response: Response) => {
                return response["data"] as IPool;
            });
    }

    public deletePool(id: string): Observable<any> {
        return this.http.delete(`${this.poolUrl}/${id}`);
    }

}
