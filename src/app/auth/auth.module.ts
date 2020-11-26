import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from '../auth/auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([
        { path: 'auth', component: AuthComponent }
    ]),
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AuthModule { }
