import { Component, OnInit } from '@angular/core';
import { FirestoreService, Transaction } from '../../../../firestore.service';
import { ApexChart,NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-doughnut-chart', 
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit {
  chartOptions: {
    chart: ApexChart;
    series: number[];
    labels: string[];
  } = {
    chart: {
      type: 'pie',
      width: '100%'
    },
    series: [], 
    labels: [], 
  };

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.fetchTransactionsAndUpdateChart();
  }

  fetchTransactionsAndUpdateChart(): void {
    this.firestoreService.getAllTransactions().subscribe(
      (data) => {
        const transactionCategories = this.calculateTransactionCategories(data);
        this.updateChart(transactionCategories);
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  calculateTransactionCategories(transactions: Transaction[]): { [key: string]: number } {
    const categories: { [key: string]: number } = {
      Dining: 0,
      Entertainment: 0,
      Income: 0,
      Transit: 0,
      Shopping: 0,
      Groceries :0,
      Bills:0,
      Rent:0,
    };

    for (let transaction of transactions) {
      if (categories[transaction.category] !== undefined) {
        if (transaction.type === 'Expense') {
          categories[transaction.category] += transaction.amount;
        } else if (transaction.type === 'Income') {
          categories[transaction.category] += transaction.amount;
        }
      }
    }
    console.log(categories);
    return categories;
  }

  updateChart(transactionCategories: { [key: string]: number }): void {
    this.chartOptions.labels = Object.keys(transactionCategories);
    this.chartOptions.series = Object.values(transactionCategories);
  }
}
