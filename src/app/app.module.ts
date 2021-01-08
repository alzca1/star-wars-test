import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipComponent } from './ships/ship/ship.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCacheService } from './services/request-cache.service';
import { CachingInterceptorService } from './services/caching-interceptor.service';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { NewShipComponent } from './ships/new-ship/new-ship.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'ships',
    canActivate: [AuthGuardService],
    component: ShipsComponent,
  },

  {
    path: 'ship',
    component: ShipComponent,
  },
  {
    path: 'new-ship',
    component: NewShipComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ShipsComponent,
    ShipComponent,
    ModalComponent,
    NewShipComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:CachingInterceptorService, multi:true},CookieService, AuthGuardService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
