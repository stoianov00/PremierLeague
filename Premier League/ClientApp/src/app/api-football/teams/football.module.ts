import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import TeamsListComponent from "./teams-list/teams-list.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatListModule } from "@angular/material/list";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";

@NgModule({
  declarations: [TeamsListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: "api/teams",
        component: TeamsListComponent,
        canActivate: [AuthorizeGuard],
      },
    ]),
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
  ],
})
export class FootballModule {}
