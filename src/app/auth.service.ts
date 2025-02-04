import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  onAuthStateChanged
} from '@angular/fire/auth'; 
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  loading: any;

  constructor(private auth: Auth,private userService:UserService) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUserSubject.next(user);
        console.log('User is signed in:', user);
      } else {
        this.currentUserSubject.next(null);
        console.log('No user is signed in.');
      }
    });
  }

  // Sign In
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Sign-in successful');
      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  
  // Sign Up
  async signUp(email: string, password: string, userData: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      try {
        await this.userService.saveUserDetails(user.uid, userData);
        console.log('User details saved to Firestore successfully.');
        return userCredential;
      } catch (error) {
        console.error('Error saving user details to Firestore:', error);
        throw error;
      }
    } catch (error_1) {
      console.error('Error during sign up:', error_1);
      throw error_1;
    }
  }


  // Sign Out
  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  // Get Current User
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
  getCurrentUserId(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.uid : null;
  }
}
