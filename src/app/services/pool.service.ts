import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

import { IPool } from "../interfaces/pool.interface";

@Injectable()
export class PoolService {

    api_url = "http://localhost:3000";
    poolUrl = `${this.api_url}/api/pools`;

    constructor(
        private http: HttpClient
    ) {}

    public getPoolList(): Observable<IPool[]> {
        return this.http.get(this.poolUrl)
            .map( (response) => {
                console.log(response);
                return response["data"].docs as IPool[];
            });
    }

    public getPool(id: string): Observable<IPool> {
        return this.http.get(`${this.poolUrl}/${id}`)
            .map((response) => {
                return response["data"] as IPool;
            });
    }

    public addPool(pool: IPool): Observable<IPool> {
        return this.http.post(this.poolUrl, pool)
            .map( (response) => {
                return response["data"];
            });
    }

    public updatePool(pool: IPool): Observable<IPool> {
        return this.http.put(`${this.poolUrl}/${pool._id}`, pool)
            .map((response) => {
                return response["data"];
            });
    }

    public deletePool(id: string): Observable<null> {
        return this.http.delete(`${this.poolUrl}/${id}`)
            .map((response) => {
                return response["data"];
            });
    }

}
