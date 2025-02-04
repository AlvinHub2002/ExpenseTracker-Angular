import {  Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { InflowComponent } from "./inflow/inflow.component";
import { OutflowComponent } from "./outflow/outflow.component";
import { TransactionsComponent } from "./transactions/transactions.component";

export const dashboardRoutes : Routes =[
    {path:'home', component:HomeComponent },
    {path:'inflow', component:InflowComponent},
    {path:'outflow', component:OutflowComponent},
    {path:'transaction', component:TransactionsComponent},
    {path:'', redirectTo:'home', pathMatch:'full'}
];