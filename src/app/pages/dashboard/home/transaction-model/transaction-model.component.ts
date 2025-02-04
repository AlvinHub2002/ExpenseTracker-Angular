import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FirestoreService, Transaction } from '../../../../firestore.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-transaction-model',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-model.component.html',
  styleUrls: ['./transaction-model.component.css']
})

export class TransactionModelComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() transaction: Transaction = {
    type: 'Expense', 
    amount: 0,
    date: new Date(),
    category: '',
    title: '',
    notes: ''
  };
  @Output() close = new EventEmitter<void>();

  selected: boolean = true; 
  open = false;
  showToast: boolean = false;
  showDeleteToast : boolean = false;
  deleteConfirm : boolean = false;

  categories = ['Dining', 'Entertainment', 'Income', 'Transit', 'Shopping', 'Groceries', 'Bills', 'Rent'];

  constructor(private firestoreService: FirestoreService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transaction'] && this.transaction) {
      this.selected = this.transaction.type === 'Expense'; 
    }
  } 

  openConfirmDelete(){
    this.deleteConfirm = true;
  }

  closeConfirmDelete(){
    this.deleteConfirm = false;
  }

  closeModel() {
    this.close.emit();
    this.clearForm();
  }

  toggleSelected() {
    this.selected = !this.selected; 
    this.transaction.type = this.selected ? 'Expense' : 'Income'; 
  }

  selectCategory(selectedCategory: string) {
    this.transaction.category = selectedCategory;
    this.open = false;
  }

  // Add or update the transaction
  addTransaction() {
    if (this.transaction.amount && this.transaction.category && this.transaction.title) {
      if (this.transaction.id) {
        this.firestoreService.updateTransaction(this.transaction.id, this.transaction)
          .then(() => {
            this.closeModel();
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 3000);
          })
          .catch(error => {
            console.error('Error updating transaction:', error);
          });
      } else {
        this.firestoreService.addTransaction(this.transaction)
          .then(() => {
            this.closeModel();
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 3000);
          })
          .catch(error => {
            console.error('Error adding transaction:', error);
          });
      }
      return;
    }
    console.warn('Please fill in all required fields!');
  }

  deleteTransaction() {
    if (this.transaction.id) {
      this.firestoreService.deleteTransaction(this.transaction.id)
        .then(() => {
          console.log('Deleted successfully');
          this.deleteConfirm = false;
          this.closeModel(); 
          this.showDeleteToast = true; 
          setTimeout(() => {
            this.showDeleteToast = false;
          }, 3000);
        })
        .catch((error) => {
          console.error('Error deleting transaction:', error);
          alert('Failed to delete the transaction. Please try again later.');
        });
    } else {
      console.warn('No transaction ID found. Cannot delete transaction.');
    }
  }
  
  // Clear the form fields
  clearForm() {
    this.transaction = {
      type: 'Expense', 
      amount: 0,
      date: new Date(),
      category: '',
      title: '',
      notes: ''
    };
  }
}
