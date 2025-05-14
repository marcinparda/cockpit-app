import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch categories. Please try again.';
        this.isLoading = false;
        console.error('Error fetching categories:', err);
      },
    });
  }
}
