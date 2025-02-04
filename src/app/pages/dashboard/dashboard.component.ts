import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true
})
export class DashboardComponent {
}
