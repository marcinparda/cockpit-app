import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPaymentMethods();
  }

  fetchPaymentMethods(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch payment methods. Please try again.';
        this.isLoading = false;
        console.error('Error fetching payment methods:', err);
      },
    });
  }
}
