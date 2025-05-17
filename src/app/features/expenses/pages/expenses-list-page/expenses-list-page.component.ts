import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpensesListComponent } from '../../components/expenses-list/expenses-list.component';
import { NavigationHeaderComponent } from '../../../../shared/components/navigation-header/navigation-header.component';

@Component({
  selector: 'app-expenses-list-page',
  templateUrl: './expenses-list-page.component.html',
  styleUrls: ['./expenses-list-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExpensesListComponent,
    NavigationHeaderComponent,
  ],
})
export class ExpensesListPageComponent {}
