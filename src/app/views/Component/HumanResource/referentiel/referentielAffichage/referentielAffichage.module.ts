import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "app/shared/shared.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { Ng2TelInputModule } from "ng2-tel-input";
import { NgxPaginationModule } from "ngx-pagination";
import { referentielAffichageComponent } from "./referentielAffichage.component";
import { CandidatRoutes } from "../../candidate/CandidatCrud/candidat-crud.routing";
import { CrudService } from "app/views/cruds/crud.service";
import { referentielService } from "../referentiel.service";
import { referentielRoutes } from "../referentiel.routing";
import { questionUpdateComponent } from "./questionUpdate.component";


@NgModule({
  imports: [
    
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TranslateModule,
    MatSortModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    Ng2TelInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTabsModule,
    RouterModule.forChild(referentielRoutes)
  ],
  declarations: [referentielAffichageComponent,questionUpdateComponent],
  providers: [referentielService]
})
export class referentielAffichageModule{ }