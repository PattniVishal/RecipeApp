import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    errorMsg: string = null;
    authObs: Observable<AuthResponseData>;

    constructor(private authService: AuthService,
                private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            this.authObs = this.authService.login(email, password);
        }
        else {
            this.authObs = this.authService.signup(email, password);
        }

        this.authObs.subscribe((responseData) => {
            console.log("Response from Firebase: ", responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },
            errorMessage => {
                console.log(errorMessage);
                this.errorMsg = errorMessage;
                this.isLoading = false;
            });;

        form.reset();
    }
}