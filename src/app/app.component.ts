import { Component, Inject, OnInit } from "@angular/core";
import { MatSnackBar, MatBottomSheet } from "@angular/material";
import { AppService } from "./app.service";
import { DomainsService } from "./services/domains.service";
import { DomainInstance } from "./models/domain";
import { Tasks } from "./models/tasks";
import { Goals } from "./models/goals";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BottomSheetComponent} from './utils/bottomsheet.component';

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})

export class AppComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;

  public title = "Colony UNSDG";
  public status = "";

  public state = {
    colonyClient: [],     // colonyClient (per account)
    networkClient: [],    // networkClient (per account)
  };
  public selectedDomain = new DomainInstance();

  public model = {
    colony: {
      address: "",
      id: null,
    },
    domain: {
      id: null,
      parentSkillId: null,
      potId: null,
    },
    networkClient: {
      accountAddr: "",
      addr: "",
    },
    parentDomainId: 1,
    task: {
      desc: "",
      title: "",
    },
    taskObject: null,
    token: {
      address: "",
      name: "",
      symbol: "",
    }
  };

  constructor(@Inject(MatSnackBar) private matSnackBar: MatSnackBar,
              @Inject(AppService) private appService: AppService,
              @Inject(DomainsService) private ds: DomainsService,
              @Inject(FormBuilder) private _formBuilder: FormBuilder,
              @Inject(MatBottomSheet) private bottomSheet: MatBottomSheet){
               
              }

  public ngOnInit(): void {
      console.log(this.selectedDomain);
    this.start();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.appService.bottomSheetObservable.subscribe((state) => {
      console.log(state);
    });
    this.ds.selectedDomainObservable.subscribe((domain: DomainInstance) => {
        this.selectedDomain = domain;
        console.log(domain);
    })
  }

  public async start() {
    // Create an instance of ColonyNetworkClient using the adapter
    this.appService.connectNetwork().then( (res) => {
      this.state.networkClient[0] = res;
      this.model.networkClient.addr = this.state.networkClient[0]._contract.address;
      this.model.networkClient.accountAddr = this.state.networkClient[0]._contract.signer.address;
      this.appService.updateColonyInstance('account.addr', this.model.networkClient.accountAddr);
      this.appService.updateColonyInstance('network.addr', this.model.networkClient.addr);
    }).catch( (err) => {
      this.setStatus("Error: See console");
      console.error(err);
    });
  }

  // Create an ERC20 token
  public async token(name, symbol) {
    this.setStatus("Initiating tx...");
    this.appService.createToken(this.state.networkClient[0], name, symbol).then( (res) => {
        console.log(res);
      this.model.token.name = name;
      this.model.token.symbol = symbol;
      this.model.token.address = res;
      this.appService.updateColonyInstance('token.addr', res);
      this.setStatus("Success!");
    }).catch( (err) => {
      this.setStatus("Error: See console");
      console.error(err);
    });
  }

  // Create a colony using the token address of the ERC20 token
  public async createColony(tokenAddress) {
      console.log(tokenAddress);
    this.setStatus("Initiating tx...");
    this.appService.createColony(this.state.networkClient[0], tokenAddress).then( (res) => {
      this.model.colony = res;
      this.appService.updateColonyInstance('colony.addr', res.address);
      this.getColonyClient();
    }).catch( (err) => {
      this.setStatus("Error: See console");
      console.error(err);
    });
  }

  // Get an initialized ColonyClient for the colony
  public async getColonyClient() {
    this.appService.getColonyClient(this.state.networkClient[0], this.model.colony.id).then( (res) => {
      this.state.colonyClient[0] = res;
      this.selectedDomain.name = "Please select UNSDG, then add the goal as a DOMAIN";
      this.selectedDomain.desc = "";
      this.setStatus("Success!");
    });
  }

  // Add a domain to the colony
  public async addDomain() {
    this.setStatus("Initiating tx...");
    this.appService.addDomain(this.state.colonyClient[0], this.model.parentDomainId).then( (res) => {
      this.model.domain = res;
      this.setStatus("Success!");
      const index = this.selectedDomain.id - 1;
      this.model.task = Tasks[index];
      console.log(this.model.task);
    }).catch( (err) => {
      this.setStatus("Error: See console");
      console.error(err);
    });
  }

  // Create a task in the colony
  public async createTask(title, desc, domainId) {
    this.setStatus("Initiating tx...");
    const taskObj = {title, desc};
    this.model.task.title = title;
    this.model.task.desc = desc;
    this.appService.createTask(this.state.colonyClient[0], Number(domainId), taskObj).then( (res) => {
      this.model.taskObject = res;
      this.setStatus("Success!");
    }).catch( (err) => {
      this.setStatus("Error: See console");
      console.error(err);
    });
  }

  private setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  openBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent);
  }

  reset(s) { 
    s.reset();
    this.state.colonyClient = [];
    this.model.domain.id = null;
  }
}