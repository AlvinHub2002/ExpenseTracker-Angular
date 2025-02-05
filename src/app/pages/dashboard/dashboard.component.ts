import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent,RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true
})
export class DashboardComponent {

  isSidebarOpen = true; // Default state (true means sidebar is open)

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
}
