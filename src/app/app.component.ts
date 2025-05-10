import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiButtonComponent } from './components/api-button/api-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ApiButtonComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cockpit-app';
}
