import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Fake Backend para logar e manter seu token jwt ativo
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { appRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PainelAComponent } from './restricted/painel-a/painel-a.component';
import { PainelBComponent } from './restricted/painel-b/painel-b.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PainelAComponent,
    PainelBComponent,

  ],
  exports:[
    PainelAComponent,
    PainelBComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // Chama o provider para validar o backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
