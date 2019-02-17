import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, 
    MatSnackBarModule, MatToolbarModule, MatStepperModule, MatExpansionModule, 
    MatIconModule, MatBottomSheetModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { TxService } from "./services/tx.service";
import { DomainsService } from "./services/domains.service";
import { DomainsComponent } from './domains/domains.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TxComponent } from './tx/tx.component';
import { TasksComponent } from './tasks/tasks.component';
import { BottomSheetComponent } from './utils/bottomsheet.component';

@NgModule({
  declarations: [AppComponent, DomainsComponent, TxComponent, TasksComponent, BottomSheetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatBottomSheetModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [AppService, TxService, DomainsService],
  entryComponents: [BottomSheetComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
