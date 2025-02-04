import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService,Transaction } from '../../../firestore.service';
import { TransactionModelComponent } from '../home/transaction-model/transaction-model.component';

@Component({
  selector: 'app-outflow',
  imports: [CommonModule,TransactionModelComponent,FormsModule],
  templateUrl: './outflow.component.html',
  styleUrl: './outflow.component.css'
})
export class OutflowComponent {
  transactions:Transaction []=[];
  expenseTransactions :Transaction[]=[];
  constructor(private firestoreService : FirestoreService){}
  filterModelVisible:boolean = false;


  isModelVisible = false;
  selectedTransaction: Transaction = {
    type: "",
    amount: 0,
    date: new Date(),
    category: '',
    title: '',
    notes: ''
  };
  startDate:string = '';
  endDate:string= '';

  openfilterModel(){
    this.filterModelVisible = true;
  }

  openModel(){
    this.isModelVisible = true;
  }

  closeModel(){
    this.isModelVisible=false;
  }

  openEditTransaction(transaction: Transaction) {
    this.selectedTransaction ={...transaction} 
    this.isModelVisible = true; 
  }


  ngOnInit():void{
    this.fetchTransactions();
  }

  fetchTransactions():void{
    this.firestoreService.getAllTransactions().subscribe(
      (data)=>{
        console.log(data);
        this.transactions = data;
        if (this.startDate && this.endDate) {
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          this.transactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= start && transactionDate <= end;
          });
        }

        this.expenseTransactions = this.transactions.filter(transaction =>transaction.type==="Expense")
        this.expenseTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      (error)=>{
        console.error('error fetching transactions ', error);
      }
    );
  }

  applyFilter(){
    this.fetchTransactions();
    this.filterModelVisible = false;
  }
  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.fetchTransactions();  
    this.filterModelVisible = false;
  }

  getFormattedAmount(amount: number): string{
    return Math.abs(amount).toLocaleString(); 
  }
}
