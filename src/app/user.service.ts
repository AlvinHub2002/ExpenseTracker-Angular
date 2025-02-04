import { Injectable } from '@angular/core';
import { Firestore, doc,setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Loggeduser } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }
  
    saveUserDetails(uid: string, userData: any): Promise<void> {
      const userRef = doc(this.firestore, 'users', uid); 
      return setDoc(userRef, { uid, ...userData }, { merge: true }) 
        .then(() => {
          console.log('User Details added successfully');
        })
        .catch((error) => {
          console.error('Error adding user details:', error);
          throw error;
        });
    }
  
  
  
    getUserDetails(uid: string): Observable<any> {
      const userRef = doc(this.firestore, 'users', uid);
      console.log('userRef', docData(userRef));
      return docData(userRef,{ idField: 'uid' }) as Observable<Loggeduser>;
    }
  
  
}
