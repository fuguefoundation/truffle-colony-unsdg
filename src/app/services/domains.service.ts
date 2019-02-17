import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { Goals } from '../models/goals';
import { DomainInstance } from '../models/domain';

@Injectable()
export class DomainsService {

    // selectedDomain: DomainInstance;
    public selectedDomainObservable = new Subject<{}>();
    private selectedDomain$ = {};

  constructor() {
    this.watchSelctedDomain();
  }

  getGoals() {
    return Goals;
  }

//   getSelectedDomain() {
//       return this.selectedDomain;
//   }

  updateSelctedDomain(domain) {
    // this.selectedDomain = domain;
    // console.log(this.selectedDomain);
    this.selectedDomainObservable.next(domain);
  }

  watchSelctedDomain() {
    this.selectedDomainObservable.subscribe((state) => {
      this.selectedDomain$ = state;
    });
  }

  getSelctedDomain() {
    return this.selectedDomain$;
  }
}
