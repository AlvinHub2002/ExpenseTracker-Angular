import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-landing',
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
 
  constructor (private router : Router){}

  navigateToDashboard(){
    this.router.navigate(['/dashboard'])
  }
}
