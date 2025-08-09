import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';
import { ApiService } from '../../../api/api.service';
import type { PaymentMethodCreate } from '@cockpit-app/api-types';

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavigationHeaderComponent],
})
export class PaymentMethodCreateComponent {
  newPaymentMethod: PaymentMethodCreate = {
    name: '',
  };
  isSaving = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.isSaving = true;
    this.error = null;

    this.apiService.createPaymentMethod(this.newPaymentMethod).subscribe({
      next: () => {
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
