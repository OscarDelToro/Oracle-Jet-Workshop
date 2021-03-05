import * as ko from "knockout";
import * as AccUtils from "../accUtils";
import "ojs/ojknockout";
import { whenDocumentReady } from "ojs/ojbootstrap";
import "ojs/ojlistview";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojlistitemlayout";
import { event } from "@oracle/oraclejet/dist/types/ojvcomponent-element";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojformlayout"
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojbutton";
import "ojs/ojprogress-bar";
import UserService from '../service/user.service';
// Service
 

interface UserData{
  name: string;
  title: string;
  email: string;
}

class UsersViewModel {
  public userService = new UserService();
  public newName: ko.Observable<string>;
  public newTitle: ko.Observable<string>;
  public newEmail: ko.Observable<string>;

  private userDataArray: ko.ObservableArray<UserData>;
  public usersDataProvider : ArrayDataProvider<UserData['name'],UserData>;
  public dataLoaded: ko.Observable<boolean>;
 
 
 // Computed
 public saveDisabled: ko.Computed;

  constructor() {
    this.newName = ko.observable('');
    this.newTitle = ko.observable('');
    this.newEmail = ko.observable('');

    this.userDataArray= ko.observableArray(/*[
      {
        id: 1,
        name: "Pepe",
        title: "El de los memes",
        email: "elpepe@gmail.com",
      },
      {
        id: 2,
        name: "Cristobal Colón",
        title: "Gachupín navegante",
        email: "laniña@lapinta.com",
      }
    ]*/);

    this.usersDataProvider = new ArrayDataProvider(this.userDataArray,{
      keyAttributes: 'name'
    });
    
    this.dataLoaded = ko.observable(false);
    
    this.saveDisabled = ko.computed(() => {
      return this.newName() === '' || this.newTitle() === '' ||this.newEmail() === '';
    });

    this.getUsers();


  
  }
 
 
 // loading
 


  //ReST
  private getUsers = () => {
    this.userService.getUsers().then(response => {
      console.log(response);
      response.data.users.forEach(user => {
        this.userDataArray.push({ name: user.name, title: user.title, email: user.email });
      });
      this.dataLoaded(true);
    }).catch(error => {
      console.log(error);
    });
  }
 
  //actions
  public saveUser = () =>{
    console.log(`New name: ${this.newName()}`);
    console.log(`New title: ${this.newTitle()}`);
    console.log(`New email: ${this.newEmail()}`);
    this.userDataArray.
    push({name: this.newName(),title: this.newTitle(),email: this.newEmail()});
    //this.userDataArray.valueHasMutated();

  }
  public discardChanges = ()=>{
    this.newName('');
    this.newTitle('');
    this.newEmail('');
  }

  //Handlers
  public handleLiistSelectionChanged = (event: ojListView.selectedChanged<UserData['name'],UserData>)=>{
    console.log(event);
  }


  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    AccUtils.announce("Users page loaded.");
    document.title = "Users";
    // implement further logic if needed
  }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  disconnected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  transitionCompleted(): void {
    // implement if needed
  }
}

export = UsersViewModel;
