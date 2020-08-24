import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { StudentsComponent } from './students/students.component';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    PageNotFoundComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
