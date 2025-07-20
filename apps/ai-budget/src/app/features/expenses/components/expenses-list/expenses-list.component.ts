import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ExpensesListComponent implements OnInit {
  expenses: any[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getExpenses().subscribe({
      next: (response) => {
        this.expenses = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch expenses. Please try again.';
        this.isLoading = false;
        console.error('Error fetching expenses:', err);
      },
    });
  }
}
