import { Component } from '@angular/core';
import { BookClass } from 'src/app/models/book.model';
import { ArrayBookService } from 'src/app/services/array-book.service';

@Component({
  selector: 'app-list-deseados',
  templateUrl: './list-deseados.component.html',
  styleUrls: ['./list-deseados.component.scss']
})
export class ListDeseadosComponent {

  books:BookClass[]= []; 
  book!:BookClass;

  constructor(private arrayOperations:ArrayBookService) {
  }


  get totalLibros(): number { //con este getter leo la longitud del array y si hay cambios
    return this.books.length;
  }

  //capturar los eventos de arrastrar objetos
  onDragOver (event:DragEvent){
    event.preventDefault();  
  }
  onDrop(event: DragEvent) {
    console.log('hola');
    event.preventDefault();
    // Se obtiene la cadena JSON del objeto del libro arrastrado desde el almacenamiento de datos
    const jsonString = event.dataTransfer?.getData('application/json');
    // Se convierte la cadena JSON en un objeto nuevamente
    this.book = JSON.parse(jsonString!);  
    this.arrayOperations.addLibro(this.books, this.book);
  }

}
