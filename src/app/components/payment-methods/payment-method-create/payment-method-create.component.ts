import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class PaymentMethodCreateComponent {
  newPaymentMethod: any = {
    name: '',
  };
  isSaving: boolean = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.isSaving = true;
    this.error = null;

    this.apiService.createPaymentMethod(this.newPaymentMethod).subscribe({
      next: (_) => {
        this.isSaving = false;
        this.router.navigate(['/payment-methods']);
      },
      error: (err) => {
        this.error = 'Failed to create payment method. Please try again.';
        this.isSaving = false;
        console.error('Error creating payment method:', err);
      },
    });
  }
}
