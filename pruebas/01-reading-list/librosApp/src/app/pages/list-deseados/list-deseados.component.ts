import { Component } from '@angular/core';
import { BookClass } from 'src/app/models/bookClass.model';
import { ArrayBookService } from 'src/app/services/array-book.service';
import { DragService } from 'src/app/services/drag.service';

@Component({
  selector: 'app-list-deseados',
  templateUrl: './list-deseados.component.html',
  styleUrls: ['./list-deseados.component.scss']
})
export class ListDeseadosComponent {

  books:BookClass[]= []; 
  book!:BookClass;

  constructor(private arrayOperations:ArrayBookService, private drag:DragService) {
  }


  get totalLibros(): number { //con este getter leo la longitud del array y si hay cambios
    return this.books.length;
  }

  onDragOver(event:DragEvent){
    event.preventDefault();
  }

  onDrop(event:DragEvent){
    this.book=this.drag.onDrop(event);
    this.arrayOperations.addLibro(this.books,this.book);
    this.book.desired=true;
  }

  
  backToList(book: BookClass) {
    this.books=this.arrayOperations.deleteLibro(this.books, book);
  }

  

}
