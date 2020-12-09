import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

import { DataStorageService } from '../shared/data-storage.service';
import { map } from 'rxjs/operators';

import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    authSub: Subscription;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService,
                private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.store.select('auth')
        .pipe(
            map(authState => {
                return authState.user;
            })
        )
        .subscribe(user => {
            this.isAuthenticated = !!user;  //!user ? false : true;
        });
        
        // this.authSub = this.authService.user.subscribe(user => {
        //     this.isAuthenticated = !!user;  //!user ? false : true;
        // });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthActions.LogoutAction());
    }

    ngOnDestroy(){
        this.authSub.unsubscribe();
    }

}