import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Transaction {
  id?: string; 
  type:string;
  amount:number;
  date:Date;
  category:string;
  title:string;
  notes:string;
  userId?:string;
}

export interface Loggeduser{
  uid:string;
  name:string;
  email:string;
  phone:string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private collectionName = 'Transaction';


  constructor(private firestore: Firestore,private authService:AuthService) {}

  // Add a new expense
  addTransaction(transaction: Transaction): Promise<void> {
    const currentUserId = this.authService.getCurrentUserId(); // Get the current user's ID from AuthService
    if (currentUserId) {
      const transactionWithUserId = { ...transaction, userId: currentUserId };
      const transactionRef = collection(this.firestore, this.collectionName);
      return addDoc(transactionRef, transactionWithUserId)
        .then(() => {
          console.log('Transaction added successfully');
        })
        .catch((error) => {
          console.error('Error adding transaction:', error);
          throw error;
        });
    } else {
      throw new Error('User is not authenticated');
    }
  }

  // Get all transactions for the current user
  getAllTransactions(): Observable<Transaction[]> {
    const currentUserId = this.authService.getCurrentUserId(); // Get the current user's ID from AuthService
    if (currentUserId) {
      const transactionRef = collection(this.firestore, this.collectionName);
      const userTransactionsQuery = query(transactionRef, where('userId', '==', currentUserId));
      return collectionData(userTransactionsQuery, { idField: 'id' }) as Observable<Transaction[]>;
    } else {
      throw new Error('User is not authenticated');
    }
  }
  

  updateTransaction(id: string, transaction: Partial<Transaction>): Promise<void> {
    const transactionDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(transactionDocRef, transaction) as Promise<void>;
  }

  deleteTransaction(id: string): Promise<void> {
    const transactionDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(transactionDocRef) as Promise<void>;
  }
}
