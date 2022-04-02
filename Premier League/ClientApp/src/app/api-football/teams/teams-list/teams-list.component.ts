import { Component, OnInit, ViewChild } from "@angular/core";
import { TeamsDataService } from "../teams-data.service";
import { logoes, scheduledColumns, standingsColumns } from "../constants";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { interval } from "rxjs";

@Component({
  selector: "app-teams-list",
  templateUrl: "./teams-list.component.html",
  styleUrls: ["./teams-list.component.css"],
})
export default class TeamsListComponent implements OnInit {
  logoes = logoes;
  standingsColumns = standingsColumns;
  scheduledColumns = scheduledColumns;

  scheduledDataSource: any[] = [];
  standingsDataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: TeamsDataService) {}

  ngOnInit(): void {
    // this.getFixturesResponse();
    // this.getStandingsResponse();
  }

  getFixturesResponse() {
    interval(3000).subscribe((i) => {
      this.service.getFixturesResponse().subscribe((response) => {
        let rounds = new Set(response.map((item) => item.league.round));
        rounds.forEach((g) =>
          this.scheduledDataSource.push({
            round: g,
            values: response.filter((i) => i.league.round === g),
          })
        );
      });

      console.log("Fixtures" + i);
    });
  }

  getStandingsResponse() {
    interval(3000).subscribe((i) => {
      this.service.getStandingsResponse().subscribe((response) => {
        this.standingsDataSource = new MatTableDataSource(
          response[0].league.standings[0]
        );

        this.standingsDataSource.sortingDataAccessor = (obj, property) =>
          this.getProperty(obj, property);
        this.standingsDataSource.sort = this.sort;

        console.log("Standings " + i);
      });
    });
  }

  getProperty = (obj, path) => path.split(".").reduce((o, p) => o && o[p], obj);

  splitTeamForm = (form: string): string[] => form.split("");
}
