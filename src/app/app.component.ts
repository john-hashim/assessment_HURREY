import { Component,Injectable } from '@angular/core';
import { TranslateService} from '@ngx-translate/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HURREY';
  constructor(public translate:TranslateService){
    translate.setDefaultLang('en');
  }


  switchLanguage(language){
    console.log(language.value);
    this.translate.use(language);
  }
}
