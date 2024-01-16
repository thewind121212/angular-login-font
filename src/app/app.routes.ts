import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register Go' },
    { path: '404', component: NotFoundComponent, title: '404' },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];
