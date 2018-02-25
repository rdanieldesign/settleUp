import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './details/details.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { LabelledInputComponent } from './components/labelled-input/labelled-input.component';

import { AuthenticationService } from "./auth/services/authentication.service";
import { TokenService } from "./auth/services/token.service";
import { AuthGuardService } from "./auth/services/auth-guard.service";

import { TokenInterceptor } from "./auth/token.interceptor";

import { routes } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent,
    DetailsComponent,
    ButtonComponent,
    InputComponent,
    LabelledInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // debugging purposes only
    )
  ],
  providers: [
    AuthenticationService,
    TokenService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
