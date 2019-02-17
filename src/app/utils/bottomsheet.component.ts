import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import { AppService } from "../app.service";
import {ColonyInstance} from '../models/colony';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: 'bottomsheet.component.html'
})
export class BottomSheetComponent implements OnInit {
    colonyInstance = new ColonyInstance();
    state = [];

  constructor(@Inject(AppService) private appService: AppService,
  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  @Inject(MatBottomSheetRef) private bottomSheetRef: MatBottomSheetRef) {}

  ngOnInit(): void {
    // this.appService.bottomSheetObservable.subscribe((state) => {
    //   console.log(state);
    // });
    this.state = this.appService.getColonyInstance();
    console.log(this.appService.getColonyInstance());
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}