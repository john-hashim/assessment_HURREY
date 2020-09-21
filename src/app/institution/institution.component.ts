import { Component, OnInit } from '@angular/core';
import { Institution } from '../models/institution';
import { InstitutionService } from '../services/institution.service';
import { TranslateService} from '@ngx-translate/core'; 

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {

  constructor(public institutionService:InstitutionService,public translate:TranslateService) { 
    translate.setDefaultLang('en');
  }
  latitude:number
  longitude:Number
  Institutions:Institution[];
  institutionItem:Institution={
    name:'',
    latitude:null,
    longitude:null
  }

  ngOnInit(): void {
      this.institutionService.getInstitution().subscribe(Batches=>{
        this.Institutions=Batches;
        console.log(this.Institutions)
      }); 
  }
  onSubmit(){
    if(this.institutionItem.name!=''&&this.institutionItem.latitude!=null&&this.institutionItem.longitude!=null){
      this.institutionService.addInstituiton(this.institutionItem);
      this.institutionItem.name='';
      this.institutionItem.latitude=null;
      this.institutionItem.longitude=null
      this.latitude=null;
      this.longitude=null;
    }
  }
  deleteInstitution($event,inst){
    this.institutionService.deleteInstitution(inst);
  }
  getLocation(){
      navigator.geolocation.getCurrentPosition((position)=>{
          this.institutionItem.latitude=position.coords.latitude;
          this.institutionItem.longitude=position.coords.longitude;
          this.latitude=position.coords.latitude;
          this.longitude=position.coords.longitude;
      });
  }

}
