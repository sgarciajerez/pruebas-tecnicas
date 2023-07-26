import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { BookComponent } from './components/book/book.component';
import { BookService } from './services/book.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListDeseadosComponent } from './pages/list-deseados/list-deseados.component';
import { InputsComponent } from './components/inputs/inputs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BookComponent,
    ListDeseadosComponent,
    InputsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
