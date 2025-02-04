import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  email : string ='';
  password : string ='';
  loading:boolean = false;

  constructor(private authService: AuthService, private router : Router) { }

  login(){
    this.loading = true;
    this.authService.signIn(this.email,this.password).then(()=>{
      console.log('User Logged In');
      this.router.navigate(['/dashboard']);
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      this.loading = false;
    });
  }
}
