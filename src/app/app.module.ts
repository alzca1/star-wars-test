import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipComponent } from './ships/ship/ship.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    component: ShipsComponent,
  },

  {
    path: 'ship', 
    component: ShipComponent
  }
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
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
