import { Component } from '@angular/core';
import { ApiButtonComponent } from '../api-button/api-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ApiButtonComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  // MainLayout component logic here if needed
}
