import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router'
import { Tab1PageRoutingModule } from './tab1-routing.module';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [NavParams, FormBuilder]
})
export class Tab1Page {
  public keywordList: string[] = [];
  protected formgroup: FormGroup;
  public keyWordForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParms: NavParams, 
    public formBuilder: FormBuilder,
    private router: Router,
  ){

  }

  public ngOnInit(): any{
    this.keyWordForm = this.formBuilder.group(
      {
        keyWords: new FormControl("",[Validators.required, Validators.pattern(/^[^\s].+[^\s]$/)])
      }
    )
  }

  public async saveKeyWords(){
    const textValues = this.keyWordForm.value.keyWords

    // Remove any empty spaces so they don't get added to the array.
    const keyWordClean = textValues.split(/[ ,]+/).filter(
      function(keyword)
    {
      return keyword!==''
    }).join(',')

    //Can only pass parameters between pages as strings in Ionic 6. 
    const keyWordString = keyWordClean
    this.goToNextPage(keyWordString)
  }

  public goToNextPage(value){
    this.router.navigate(['/tabs/tab2',{keywords:value}])
  }

}
