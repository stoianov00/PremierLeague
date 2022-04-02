import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Fixtures, Response } from "./fixtures";
import { FullResponse, Response as StandingsResponse } from "./standings";

@Injectable({
  providedIn: "root",
})
export class TeamsDataService {
  private readonly API_URL: string = environment.api_url;
  private readonly API_KEY: string = environment.api_key;
  private readonly API_VALUE: string = environment.api_value;

  private readonly PREMIER_LEAGUE_ID: string = "39";
  private readonly SEASON: string = "2021";
  private readonly BUFFER_SIZE: number = 1;

  constructor(private httpClient: HttpClient) {}

  getFixturesResponse(): Observable<Response[]> {
    return this.httpClient
      .get<Fixtures>(`${this.API_URL}fixtures?${this.params()}`, {
        headers: this.headers(),
      })
      .pipe(map((data) => data.response))
      .pipe(shareReplay(this.BUFFER_SIZE));
  }

  getStandingsResponse(): Observable<StandingsResponse[]> {
    return this.httpClient
      .get<FullResponse>(`${this.API_URL}standings?${this.params()}`, {
        headers: this.headers(),
      })
      .pipe(map((data) => data.response))
      .pipe(shareReplay(this.BUFFER_SIZE));
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({
      [this.API_KEY]: this.API_VALUE,
    });
  }

  private params(): string {
    return new HttpParams()
      .set("league", this.PREMIER_LEAGUE_ID)
      .set("season", this.SEASON)
      .toString();
  }
}
