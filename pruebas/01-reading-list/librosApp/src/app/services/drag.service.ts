import { Injectable } from '@angular/core';
import { BookClass } from '../models/bookClass.model';
import { ArrayBookService } from './array-book.service';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  constructor(private arrayOperators:ArrayBookService, private filterService:FilterService) { }

  private isDropped:boolean=false;
  private draggingBook!:any;

  onDragStart(event:DragEvent, book:BookClass){
    this.draggingBook=book;
    event.dataTransfer?.setData('application/json', JSON.stringify(book)); 
  }

  onDragEnd(array:BookClass[]):BookClass[] {
    if (this.isDropped) {
      //reseteamos variables
      this.isDropped=false;
      array=this.arrayOperators.deleteLibro(array, this.draggingBook);
      console.log(array);
      this.filterService.deleteLibroEnFilter(this.draggingBook);
    }
    this.draggingBook=null;
    return array;
  }

  objectDropped():void {
    this.isDropped=true;
  }

  objectNotDropped():void{
    this.isDropped=false;
  }

  getIsDropped():boolean{
    return this.isDropped;
  }

  onDrop(event: DragEvent):BookClass {
    this.objectDropped();
    let book:BookClass;
    if(this.draggingBook){
        this.draggingBook=null;
    }
    event.preventDefault();
    // Se obtiene la cadena JSON del objeto del libro arrastrado desde el almacenamiento de datos
    const jsonString = event.dataTransfer?.getData('application/json');
    // Se convierte la cadena JSON en un objeto nuevamente
    book = JSON.parse(jsonString!);
    this.draggingBook=book;
    return book;    
  }
}
