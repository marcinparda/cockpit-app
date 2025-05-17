import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseCreateComponent } from '../../components/expense-create/expense-create.component';

@Component({
  selector: 'app-expense-create-page',
  templateUrl: './expense-create-page.component.html',
  styleUrls: ['./expense-create-page.component.css'],
  standalone: true,
  imports: [CommonModule, ExpenseCreateComponent],
})
export class ExpenseCreatePageComponent {}
