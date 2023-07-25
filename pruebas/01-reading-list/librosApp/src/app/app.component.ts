import { Component, OnInit } from '@angular/core';
import { BookClass } from './models/bookClass.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'librosApp';

  book!:BookClass;

  ngOnInit(): void {
  }

  backToList(book: BookClass){
    this.book=book;  
  }

}
