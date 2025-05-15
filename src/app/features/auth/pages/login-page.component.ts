import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from '../components/login/login-card/login-card.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: true,
  imports: [CommonModule, LoginCardComponent],
})
export class LoginPageComponent implements OnInit {
  returnUrl: string = '/';
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // If already authenticated, redirect to return URL
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  onSubmitApiKey(apiKey: string): void {
    this.submitted = true;
    this.authService.saveApiKey(apiKey);
    this.router.navigateByUrl(this.returnUrl);
  }
}
