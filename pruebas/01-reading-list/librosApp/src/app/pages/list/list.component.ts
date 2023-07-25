import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BookClass } from 'src/app/models/bookClass.model';
import { ArrayBookService } from 'src/app/services/array-book.service';
import { DragService } from 'src/app/services/drag.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {

  @Input() bookEliminado!:any;
  @Input() books!:BookClass[];
  @Input() selectedGenre!:string;
  @Input() selectedTitle!:string;
  booksSinFiltro: any[] = [];
  
  constructor(private drag:DragService, private arrayOperators:ArrayBookService, private filterService:FilterService) {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.filterByTitle(); 
    this.filterByGenre();
    this.backToList();
  }

  get totalLibros(): number { //con este getter leo la longitud del array y si hay cambios
    return this.books.length;
  }

  onDragStart(event:DragEvent, book:BookClass){
    this.drag.onDragStart(event, book)
  }

  onDragEnd(){
    this.books=this.drag.onDragEnd(this.books);
  }

  backToList() {   
    if(this.bookEliminado){
      this.bookEliminado.desired=false;
      this.books=this.arrayOperators.addLibro(this.books, this.bookEliminado);
      this.books=this.arrayOperators.ordenarArray(this.books);
      this.bookEliminado=null; //tenemos que volver a eliminar la variable para que no entre en el if
    }
  }

  filterByGenre(){
    if(this.selectedGenre && this.selectedGenre!='Todos'){
      this.books=this.filterService.filterByGenre(this.books, this.selectedGenre);
      if(this.selectedTitle) { //esto lo ponemos para que el buscador funcione también cuando aplicamos un filtro por género
        this.filterByTitle();
      }    
    }
  }

  filterByTitle(){
    if(this.selectedTitle!=''){
      this.books=this.filterService.searchByTitle(this.selectedTitle, this.books);      
    } else{
      this.books=this.filterService.deleteFilter();
    }
  }


  
}
