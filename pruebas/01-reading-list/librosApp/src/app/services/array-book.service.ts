import { Injectable } from '@angular/core';
import { BookClass } from "../models/book.model"; 

@Injectable({
  providedIn: 'root'
})
export class ArrayBookService {

  constructor() { }

  addLibro(array:BookClass[], book:BookClass):BookClass[]{
      if(!array.find(el => el.ISBN==book.ISBN)){ //solo agrega objetos si no existe el isbn
        array.push(book);
      }
      return array;
  }

  deleteLibro(array:BookClass[], book:BookClass):BookClass[]{
      array=array.filter((el) => el.ISBN !== book.ISBN);
      return array;
  }

}
