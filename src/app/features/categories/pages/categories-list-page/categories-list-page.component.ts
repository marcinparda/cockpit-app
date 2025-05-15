import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';

@Component({
  selector: 'app-categories-list-page',
  templateUrl: './categories-list-page.component.html',
  styleUrls: ['./categories-list-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationHeaderComponent],
})
export class CategoriesListPageComponent implements OnInit {
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
