import { Routes } from '@angular/router';
import { Home as HomeComponent } from './home/home';
import { Profil } from './profil/profil';
import { Login } from './login/login';
import { Register } from './register/register';
import { Contact } from './contact/contact';

export const routes: Routes = [
  //mengatur halaman utama aplikasi
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: '/profil',
    component: Profil,
    title: 'Profile Page',
  },
  {
    path: 'Login',
    component: Login,
  },
  {
    path: 'Register',
    component: Register,
  },
  {
    path: 'contact',
    component: Contact,
  },
];
