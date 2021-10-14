import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [NavParams, FormBuilder]
})
export class Tab2Page {
  public searchWords: any;
  protected formgroup: FormGroup;
  public textForm: FormGroup;
  public allText: string;

  constructor(
    public navParms: NavParams, 
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
  ) {

  }
  protected async ionViewWillEnter(){

    this.textForm = this.formBuilder.group(
      {
        pastedText: new FormControl("",[Validators.required, Validators.minLength(10)])
      }
    )
      //Call the keywords from the previous page. 
      this.searchWords = this.activatedRoute.snapshot.paramMap.get('keywords');
  }

  public async processText(){
    this.allText = this.textForm.value.pastedText;
    const keyWordsArray = this.searchWords.split(",")
    const processedText = await this.replaceText(keyWordsArray,this.allText)

    const newText = processedText
    this.router.navigate(['/tabs/tab3',{finalText:newText}])
 
  }

  public async replaceText(array, file){
    var regex;
    for (let i = 0; i < array.length; i++){
        const replaceText = "xxxx"
        const currentText = array[i].replace(/['"“‘”’]+/g, '')
        regex = new RegExp(currentText, "ig");
        file = file.replace(regex,replaceText)
    }
    return file

  }
}
