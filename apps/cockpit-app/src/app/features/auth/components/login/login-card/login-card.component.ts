import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
})
export class LoginCardComponent {
  @Output() submitApiKey = new EventEmitter<string>();
  @Input() submitted = false;

  onFormSubmit(apiKey: string): void {
    this.submitApiKey.emit(apiKey);
  }
}
