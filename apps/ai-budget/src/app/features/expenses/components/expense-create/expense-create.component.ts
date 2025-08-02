import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';
import { ApiService } from '../../../api/api.service';
import type { Category, PaymentMethod } from '@cockpit-app/api-types';

@Component({
  selector: 'app-expense-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavigationHeaderComponent,
  ],
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss'],
})
export class ExpenseCreateComponent implements OnInit {
  expenseForm: FormGroup;
  categories: Category[] = [];
  paymentMethods: PaymentMethod[] = [];
  isLoadingCategories = false;
  isLoadingPaymentMethods = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category_id: ['', Validators.required],
      payment_method_id: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchPaymentMethods();
  }

  fetchCategories(): void {
    this.isLoadingCategories = true;
    this.errorMessage = '';

    this.apiService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoadingCategories = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch categories. Please try again.';
        this.isLoadingCategories = false;
        console.error('Error fetching categories:', err);
      },
    });
  }

  fetchPaymentMethods(): void {
    this.isLoadingPaymentMethods = true;
    this.errorMessage = '';

    this.apiService.getPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response;
        this.isLoadingPaymentMethods = false;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to fetch payment methods. Please try again.';
        this.isLoadingPaymentMethods = false;
        console.error('Error fetching payment methods:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.apiService.createExpense(this.expenseForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/expenses']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to create expense. Please try again.';
        this.isSubmitting = false;
        console.error('Error creating expense:', err);
      },
    });
  }
}
