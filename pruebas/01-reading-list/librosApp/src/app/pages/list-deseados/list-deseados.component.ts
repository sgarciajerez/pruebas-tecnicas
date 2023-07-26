import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BookClass } from 'src/app/models/bookClass.model';
import { ArrayBookService } from 'src/app/services/array-book.service';
import { DragService } from 'src/app/services/drag.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-list-deseados',
  templateUrl: './list-deseados.component.html',
  styleUrls: ['./list-deseados.component.scss']
})
export class ListDeseadosComponent implements OnChanges{

  books:BookClass[]=[]; 
  book!:BookClass;
  booksAuxiliar:BookClass[]=[];

  @Input()selectedGenre!:string;
  @Output() bookEliminado = new EventEmitter<BookClass>;

  constructor(private arrayOperations:ArrayBookService, private drag:DragService) {
  }

  ngOnChanges(): void {
      this.filterByGenre();
  }


  get totalLibros(): number { //con este getter leo la longitud del array y si hay cambios
    return this.books.length;
  }

  onDragOver(event:DragEvent){
    event.preventDefault();
  }

  onDrop(event:DragEvent){
    this.book=this.drag.onDrop(event);
    this.books=this.arrayOperations.addLibro(this.books,this.book);
    //esto lo hacemos para que se puedan soltar libros también y no genere conflicto cuando los filtros están activados
    if(this.selectedGenre && this.selectedGenre != 'Todos'){
      this.booksAuxiliar.push(this.book);
    } else{  
      this.booksAuxiliar=this.books;
    }
    this.book.desired=true;
  }

  filterByGenre(){
    if (this.selectedGenre != 'Todos') {
      this.books = this.booksAuxiliar; //reseteamos array, para poder capturar eventos de filtro de forma consecutiva;
      this.books = this.books.filter((el) => el.genre == this.selectedGenre);
    } else {
      this.books = this.booksAuxiliar; //cuando se seleccione la opción todos, reseteamos array;
    }
  }

  
  deleteFromList(book: BookClass) {
    this.bookEliminado.emit(book);    
    this.books=this.arrayOperations.deleteLibro(this.books, book);
    this.booksAuxiliar=this.books;
  }

  

}
