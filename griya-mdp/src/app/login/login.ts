File: `src/app/login/login.ts`;

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/housing.spec';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  // Class logic
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Form initialization
    this.loginForm = this.fb.group({
     this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      const formData = this.loginForm.value;

      // Kirim data ke backend API melalui AuthService
      this.authService.login(formData)
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.isLoading = false;
            this.successMessage = response.message || 'Login berhasil!';
            
            // Simpan user data ke localStorage
            if (response.data) {
              this.authService.saveUserData(response.data);
            }
            
            // Redirect ke home page setelah 1 detik
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          },
          error: (error) => {
            console.error('Login failed', error);
            this.isLoading = false;
            this.errorMessage = error.error?.message || 'Email atau password salah';
            
            // Auto hide error message after 5 seconds
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        });
    } else {
      console.log('Form is not valid');
      this.errorMessage = 'Mohon lengkapi semua field dengan benar';
    }
  }
}
