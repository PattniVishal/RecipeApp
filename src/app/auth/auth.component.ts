import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    errorMsg: string = null;
    authObs: Observable<AuthResponseData>;

    constructor(private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.errorMsg = authState.authError;
        })
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    // onHandleError(){
    //     this.store.dispatch(new AuthActions.ClearErrorAction());
    // }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            // this.authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
        }
        else {
            // this.authObs = this.authService.signup(email, password);
            console.log("SignUp in AuthComponent : ", email, password);
            
            this.store.dispatch(new AuthActions.SignupStartAction({email: email, password: password}));
        }

        // this.authObs.subscribe((responseData) => {
        //     console.log("Response from Firebase: ", responseData);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // },
        //     errorMessage => {
        //         console.log(errorMessage);
        //         this.errorMsg = errorMessage;
        //         this.isLoading = false;
        //     });

        form.reset();
    }
}