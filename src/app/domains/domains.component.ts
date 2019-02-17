import { Component, Inject, OnInit } from '@angular/core';
import { DomainsService } from "../services/domains.service";

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {
  goals = [];
  public model = {
    domain: {
      id: null,
      parentSkillId: null,
      potId: null,
    },
    parentDomainId: 1,
    selectedDomain: null
  };

  constructor(@Inject(DomainsService) private ds: DomainsService) { }

  ngOnInit() {
    this.goals = this.shuffle(this.ds.getGoals());
    console.log(this.goals);
  }

  setAsDomain(index) {
    this.scrollToTop();
    this.model.selectedDomain = this.goals[index];
    this.ds.updateSelctedDomain(this.model.selectedDomain)
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 5);      
  }
}
