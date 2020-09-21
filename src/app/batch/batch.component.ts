import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { BatchService } from '../services/batch.service';
import { Batch } from '../models/batch';
import { isNgTemplate } from '@angular/compiler';

import { TranslateService} from '@ngx-translate/core'; 

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {

  editState:boolean=false;
  BatchToEdit:Batch;

  Batches:Batch[];
  constructor(public BatchService:BatchService,
              public translate:TranslateService) { 
      translate.setDefaultLang('en');
    }

  batchItem:Batch={
    name:'',
    institution:'',
    day:'',
    starttime:null,
  }

  ngOnInit(): void {
    this.BatchService.getBatches().subscribe(Batches=>{
        this.Batches=Batches;
        console.log(this.Batches)
    }); 
  }

  onSubmit(){
    if(this.batchItem.name!=''&&this.batchItem.day!=''&&this.batchItem.institution!=''&& this.batchItem.starttime!=null){
      console.log(this.batchItem);
      this.BatchService.addBatches(this.batchItem);
      this.batchItem.day='';
      this.batchItem.institution='';
      this.batchItem.starttime=null;
      this.batchItem.name='';
    }
  }  

  deleteBatch(event,batch){
    this.clearState();
    this.BatchService.deleteBatch(batch);
  }
  editItem(event,Batch){
    this.editState=true;
    this.BatchToEdit=Batch;
  }
  onUpdate(batch:Batch){
      this.BatchService.updateBatch(batch);
      this.clearState();
  }
  clearState(){
    this.editState=false;
    this.BatchToEdit=null;
  }

}
