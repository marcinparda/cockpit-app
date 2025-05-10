import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-button',
  templateUrl: './api-button.component.html',
  styleUrls: ['./api-button.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ApiButtonComponent {
  apiResponse: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  fetchData(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getCockpitData().subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch data. Please try again.';
        this.isLoading = false;
        console.error('Error fetching data:', err);
      },
    });
  }
}
