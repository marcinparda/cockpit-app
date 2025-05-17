import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodCreateComponent } from '../../components/payment-method-create/payment-method-create.component';

@Component({
  selector: 'app-payment-method-create-page',
  templateUrl: './payment-method-create-page.component.html',
  styleUrls: ['./payment-method-create-page.component.css'],
  standalone: true,
  imports: [CommonModule, PaymentMethodCreateComponent],
})
export class PaymentMethodCreatePageComponent {}
