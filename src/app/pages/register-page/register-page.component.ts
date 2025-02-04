import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  name:string = '';
  email : string ='';
  password : string ='';
  phone : string ='';
  errorMessage : string ='';
  successMessage : boolean =false;

  
  constructor(private authService: AuthService, private router : Router) { }

  

  register():void{
    if(!this.email || !this.password || !this.name || !this.phone){
      this.errorMessage = 'Please fill all the fields';
      return;
    }

    const userData={
      name:this.name,
      email:this.email,
      phone:this.phone
    }

    this.authService.signUp(this.email,this.password,userData).then(()=>{
      console.log('User Registered');
      this.successMessage = true;  // Show success message
      console.log('Success message set to:', this.successMessage);  // Debugging line
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
      setTimeout(() => {
        this.successMessage = false;  // Hide success message after 5 seconds
        console.log('Success message reset:', this.successMessage);  // Debugging line
      }, 3000); 
    }).catch((err)=>{
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}
