import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirestoreService,Loggeduser } from '../../../firestore.service';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  Loggeduser:Loggeduser = {
    uid:'',
    name:'',
    email:'',
    phone:''
  };

  constructor(private userService : UserService, private AuthService:AuthService,private router:Router){}

  ngOnInit():void{
    this.fetchUserDetails();
  }

  fetchUserDetails():void{
    const user = this.AuthService.getCurrentUser();
      if(user){
        const uid = user.uid;
        this.userService.getUserDetails(uid).subscribe(
          (data)=>{
            this.Loggeduser = data;
          },
          (error)=>{
            console.error('error fetching user details ', error);
          }
        );
      }
      else{
        console.error('Not logged in');
      }
  }

  signOut():void{
    this.AuthService.signOut().then(()=>{
      this.router.navigate(['/login']);
      console.log('User signed out successfully');
    }).catch((error)=>{
      console.error('Error signing out:', error);
    });
  }
}
