import { Component } from '@angular/core';
import { BookClass } from 'src/app/models/book.model';

@Component({
  selector: 'app-list-deseados',
  templateUrl: './list-deseados.component.html',
  styleUrls: ['./list-deseados.component.scss']
})
export class ListDeseadosComponent {

  booksDeseados:BookClass[]= []; 
  deseadoBook!:BookClass;

  addLibroDeseado(book:BookClass):void{
    if(!this.booksDeseados.find(el => el.ISBN==book.ISBN)){ //solo agrega objetos si no existe el isbn
      this.booksDeseados.push(book);
    }
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
    this.deseadoBook = JSON.parse(jsonString!);
    this.addLibroDeseado(this.deseadoBook);
  }

}
