import { meetingsComponent } from './meetings/meetings.component';
import { AppComponent } from './app.component';
import { NgModule }      from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './providers/auth.service';
import { ModuleWithProviders } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
    { path: '',
      redirectTo: '/lifemeetings',
      pathMatch: 'full' },
    { path: 'login',
      component: EmailComponent },
    { path: 'signup',
      component: SignupComponent, canActivate: [AuthGuard] },
    { path: 'login-email',
      component: EmailComponent },
    {
      path: 'lifemeetings',
      component: meetingsComponent
    },
    {
      path: 'lifemeetings/: person',
      component: meetingsComponent
    },
    { path: '**', component: PageNotFoundComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
