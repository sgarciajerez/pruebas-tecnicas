import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BookClass } from 'src/app/models/bookClass.model';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnChanges {

  @Input() books!:BookClass[];
  @Output() selectedGenre = new EventEmitter<string>();
  @Output() selectedTitle = new EventEmitter <string>();
  
  generos: string[] = [
    'Todos',
    'Fantasía',
    'Ciencia ficción',
    'Zombies',
    'Terror',
  ];

  booksSinFiltro: any[] = [];
  tituloBuscado: string = '';
  generoBuscado:string = '';
  

  constructor(private filterService:FilterService){
  }

  ngOnChanges(): void {
    //aquí guardo el array que manejamos
    this.filterService.guardarBooks(this.books);
  }

  emitSearch() {
    this.selectedTitle.emit(this.tituloBuscado);
  }

  emitGenre() {
    this.selectedGenre.emit(this.generoBuscado);
  }

}
