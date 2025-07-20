import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';
import { ApiService } from '../../../api/api.service';
import type {
  Category,
  CategoryCreate,
} from '@cockpit-app/types-ai-budget-categories';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavigationHeaderComponent],
})
export class CategoryCreateComponent implements OnInit {
  newCategory: CategoryCreate = {
    name: '',
    parent_id: null,
  };
  categories: Category[] = [];
  isLoading = false;
  isSaving = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

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

  onSubmit(): void {
    this.isSaving = true;
    this.error = null;

    // Convert parent_id from string to number or null
    if (
      this.newCategory.parent_id === '' ||
      this.newCategory.parent_id === undefined
    ) {
      this.newCategory.parent_id = null;
    } else if (
      this.newCategory.parent_id !== null &&
      typeof this.newCategory.parent_id === 'string'
    ) {
      this.newCategory.parent_id = parseInt(this.newCategory.parent_id);
    }

    this.apiService.createCategory(this.newCategory).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        this.error = 'Failed to create category. Please try again.';
        this.isSaving = false;
        console.error('Error creating category:', err);
      },
    });
  }
}
