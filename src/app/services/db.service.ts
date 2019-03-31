import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Dataline } from 'src/app/dataline';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DbService {
  constructor(private db: AngularFirestore) { }

  getValues(){
    return this.db.collection('data').snapshotChanges();
  }
  
  createValues(line: Dataline){
    return this.db.collection('data').add(line);
  }

}



