import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SkillContainerComponent } from './skill.container/skill.container.component';
import { ProductContainerComponent } from './product.container/product.container.component';
import { WeatherComponent } from './weather/weather.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' }, // Redirect empty path to Home
    { path: 'Home', component: HomeComponent },
    { path: 'Skills', component: SkillContainerComponent },
    { path: 'Products', component: ProductContainerComponent },
    { path: 'Weather', component: WeatherComponent },
    { path: 'SignUp', component: LoginComponent },
    { path: 'Login', component: LoginComponent },
    { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
];
    