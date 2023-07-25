import { Component, OnInit } from '@angular/core';
import { BookClass } from './models/bookClass.model';
import { BookService } from './services/book.service';
import { ArrayBookService } from './services/array-book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'librosApp';

  books: any[] = [];
  book!:BookClass;
  selectedTitle:string='';
  selectedGenre:string='';

  constructor(private bookService: BookService, private arrayOperators:ArrayBookService){
  }  

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks()
      .then((res) => {
        this.books = res.library.map((bookData:any) => ({ //desestructuramos el objeto y le añadimos la propiedad desired
          ...bookData.book,
          desired: false,
        }));
        this.books = this.arrayOperators.ordenarArray(this.books);
      })
      .catch((error) => console.log(error));
  }

  backToList(book: BookClass){
    this.book=book;  
  }

  getFilterGenre(selectedGenre:string){
    this.selectedGenre=selectedGenre;
  }

  getFilterTitle(selectedTitle:string){
    this.selectedTitle=selectedTitle;
  }
}
