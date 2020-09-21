import { Injectable } from '@angular/core';
import { Institution } from '../models/institution';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  InstitutionCollection:AngularFirestoreCollection<Institution>
  Institutions:Observable<Institution[]>
  InstitutionDoc:AngularFirestoreDocument<Institution>

  constructor(public afs:AngularFirestore) {
    this.InstitutionCollection=this.afs.collection('institution');
    this.Institutions = this.afs.collection('institution').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Institution;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getInstitution(){ 
    return this.Institutions;
  }
  addInstituiton(InstitutionItem:Institution){
    this.InstitutionCollection.add(InstitutionItem);
  }
  deleteInstitution(Institution){
     this.InstitutionDoc=this.afs.doc(`institution/${Institution.id}`);
     this.InstitutionDoc.delete();
  }

}
