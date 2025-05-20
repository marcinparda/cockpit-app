import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentMethodsListComponent } from '../../components/payment-methods-list/payment-methods-list.component';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';

@Component({
  selector: 'app-payment-methods-list-page',
  templateUrl: './payment-methods-list-page.component.html',
  styleUrls: ['./payment-methods-list-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaymentMethodsListComponent,
    NavigationHeaderComponent,
  ],
})
export class PaymentMethodsListPageComponent {}
