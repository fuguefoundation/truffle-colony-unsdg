import {Component, Inject, OnInit} from '@angular/core';
import {TxService} from '../services/tx.service';
import {Tx} from '../models/tx';

// declare let require: any;

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html'
})
export class TxComponent implements OnInit {

  txs: Array<Tx[]> = [];
  txNames: Array<string[]> = [];

  constructor(@Inject(TxService) private txService: TxService) {

  }

  ngOnInit(): void {
    this.watchTx();
  }

  watchTx() {
    this.txService.txObservable.subscribe((tx) => {
      this.txs.push(tx);
    });
    this.txService.txName.subscribe((name) => {
      this.txNames.push(name);
    });
  }
}
