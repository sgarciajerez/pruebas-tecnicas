import { Injectable } from '@angular/core';
import { BookClass } from '../models/bookClass.model';
import { ArrayBookService } from './array-book.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  booksSinFiltro!:BookClass[];

  constructor(private arrayOperators:ArrayBookService){

  }

  guardarBooks(books:BookClass[]){
    this.booksSinFiltro=books;
  }

  deleteFilter():BookClass[]{  
    return this.booksSinFiltro;
  }

  deleteLibroEnFilter(book:BookClass){
    this.booksSinFiltro=this.arrayOperators.deleteLibro(this.booksSinFiltro,book);
    console.log(this.booksSinFiltro);
    
  }


  filterByGenre(books:BookClass[], selectedGenre:string):BookClass[]{
    books=this.deleteFilter();
    if (selectedGenre != 'Todos') {
        books = books.filter((el) => el.genre == selectedGenre);
    }
    return books;
  }

  searchByTitle(title:string, books:BookClass[]):BookClass[]{
    console.log(books);
    if (title != '') {
      books = books.filter((el) =>
        el.title.toLowerCase().includes(title)
      );
    }
    return books;
  }

}
