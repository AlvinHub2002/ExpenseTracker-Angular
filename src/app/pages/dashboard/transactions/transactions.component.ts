import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirestoreService,Transaction } from '../../../firestore.service';
import { TransactionModelComponent } from '../home/transaction-model/transaction-model.component';
import { SpinnerComponent } from '../../../spinner/spinner.component';
@Component({
  selector: 'app-transactions',
  imports: [CommonModule,RouterModule,TransactionModelComponent,FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  
  isModelVisible = false;
  filterModelVisible:boolean = false;
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

  openModel(){
    this.isModelVisible = true;
  }

  closeModel(){
    this.isModelVisible=false;
  }
  

  openfilterModel(){
    this.filterModelVisible = true;
  }

  openEditTransaction(transaction: Transaction) {
    this.selectedTransaction ={...transaction} 
    this.isModelVisible = true; 
  }

  transactions:Transaction []=[];
  constructor(private firestoreService : FirestoreService){}

  ngOnInit():void{
    this.fetchTransactions();
  }


  fetchTransactions(): void {
      this.firestoreService.getAllTransactions().subscribe(
        (data) => {
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

          this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        },
        (error) => {
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
