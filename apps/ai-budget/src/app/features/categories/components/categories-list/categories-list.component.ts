import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';
import type { Category } from '@cockpit-app/api-types';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationHeaderComponent],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  isLoading = false;
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
