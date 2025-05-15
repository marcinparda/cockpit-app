import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from '../../components/category-create/category-create.component';

@Component({
  selector: 'app-category-create-page',
  templateUrl: './category-create-page.component.html',
  styleUrls: ['./category-create-page.component.css'],
  standalone: true,
  imports: [CommonModule, CategoryCreateComponent],
})
export class CategoryCreatePageComponent {}
