import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { Batch } from '../models/batch';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  BatchCollection:AngularFirestoreCollection<Batch>
  Batches:Observable<Batch[]>
  BatchDoc:AngularFirestoreDocument<Batch>


  constructor(public afs:AngularFirestore) {
    this.BatchCollection=this.afs.collection('batches');
    this.Batches = this.afs.collection('batches').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Batch;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getBatches(){ 
    return this.Batches;
  }
  addBatches(batchItem:Batch){
    this.BatchCollection.add(batchItem);
  }
  deleteBatch(Batch){
     this.BatchDoc=this.afs.doc(`batches/${Batch.id}`);
     this.BatchDoc.delete();
  }
  updateBatch(Batch:Batch){
    this.BatchDoc=this.afs.doc(`batches/${Batch.id}`);
    this.BatchDoc.update(Batch);
  }
 

}


