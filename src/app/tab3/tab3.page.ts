import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [NavParams, FormBuilder]
})
export class Tab3Page {
  public processedTextFile: string; 
  protected formgroup: FormGroup;
  public processedTextForm: FormGroup;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,

  ) {

  }
  protected async ionViewWillEnter(){
    this.processedTextFile = this.activatedRoute.snapshot.paramMap.get('finalText');

    this.processedTextForm = this.formBuilder.group(
      {
        newText: new FormControl(this.processedTextFile)
      }
    )
  }

  public startOver(){
    this.router.navigate(['/tabs/tab1'])
  }


}
