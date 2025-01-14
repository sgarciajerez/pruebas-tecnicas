import { Injectable } from '@angular/core';
import { BookClass } from "../models/bookClass.model"; 

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

  ordenarArray(array:BookClass[]):BookClass[]{
    array=array.sort(function(a, b) {          
      return a.title.localeCompare(b.title);
    });
    return array; 
  }

  

}
