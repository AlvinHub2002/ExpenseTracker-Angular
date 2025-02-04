  import { Component } from '@angular/core';
  import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
  import { TransactionModelComponent } from './transaction-model/transaction-model.component';
  import { FirestoreService,Transaction,Loggeduser } from '../../../firestore.service';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';
  import { AuthService } from '../../../auth.service';
import { UserService } from '../../../user.service';
import { SpinnerComponent } from '../../../spinner/spinner.component';

  @Component({
    selector: 'app-home',
    imports: [DoughnutChartComponent,TransactionModelComponent,CommonModule,RouterModule,SpinnerComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent {
    isModelVisible = false;
    loading: boolean = false;
    Loggeduser:Loggeduser = {
      uid:'',
      name:'',
      email:'',
      phone:''
    };
    transactions:Transaction[]=[];
    recentTransactions: Transaction[] = [];
    selectedTransaction: Transaction = {
      type: "",
      amount: 0,
      date: new Date(),
      category: '',
      title: '',
      notes: ''
    };
    balance:number = 0;
    income:number=0;
    expense:number = 0;
   

    constructor(private firestoreService : FirestoreService, private AuthService:AuthService,private userService:UserService){}

    ngOnInit():void{
      this.loading = true;
      setTimeout(() => {
      this.fetchTransactions();
      this.fetchUserDetails();
      this.loading = false;
      }, 2000);
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


    fetchTransactions():void{
      console.log("user id is",this.AuthService.getCurrentUser()?.email);
      
      this.firestoreService.getAllTransactions().subscribe(
        (data)=>{
          this.transactions = data;
          this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.recentTransactions = this.transactions.slice(0, 5);
          this.calculateBalanceAndExpenses(); 
          
        },
        (error)=>{
          console.error('error fetching transactions ', error);
        }
      );
    }

    openModel(){
      this.isModelVisible = true;
    }

    closeModel(){
      this.isModelVisible=false;
    }

    calculateBalanceAndExpenses(): void {
      this.income = 0;
      this.expense = 0;
      this.balance = 0;

      for (let transaction of this.transactions) {
        if (transaction.type === 'Income') {
          this.income += transaction.amount;
        } else if (transaction.type === 'Expense') {
          this.expense += transaction.amount;
        }
      }

      this.balance = this.income - this.expense;
    }

    getFormattedAmount(amount: number): string{
      return Math.abs(amount).toLocaleString(); 
    }
  
    openEditTransaction(transaction: Transaction) {
      this.selectedTransaction ={...transaction} 
      this.isModelVisible = true; 
    }
  }
