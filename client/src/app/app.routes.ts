import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';
import { ProductListComponent } from './container/product-list/product-list.component';
import { WeatherComponent } from './weather/weather.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' }, // Redirect empty path to Home
    { path: 'Home', component: HomeComponent },
    { path: 'Skills', component: ContainerComponent },
    { path: 'Products', component: ProductListComponent },
    { path: 'Weather', component: WeatherComponent },
    { path: 'SignUp', component: LoginComponent },
    { path: 'Login', component: LoginComponent },
    { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
];
