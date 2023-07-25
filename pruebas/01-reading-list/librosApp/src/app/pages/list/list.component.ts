import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BookClass } from 'src/app/models/bookClass.model';
import { ArrayBookService } from 'src/app/services/array-book.service';
import { BookService } from 'src/app/services/book.service';
import { DragService } from 'src/app/services/drag.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {

  @Input() bookEliminado!:BookClass;
  
  generos: string[] = [
    'Todos',
    'Fantasía',
    'Ciencia ficción',
    'Zombies',
    'Terror',
  ];

  books: any[] = [];
  booksSinFiltro: any[] = [];
  selectedGenre: string = '';
  tituloBuscado: string = '';

  constructor(private bookService: BookService, private drag:DragService, private arrayOperators:ArrayBookService) {}

  ngOnInit(): void {
    this.loadBooks();
    console.log(this.bookEliminado);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.backToList();
  }

  get totalLibros(): number { //con este getter leo la longitud del array y si hay cambios
    return this.books.length;
  }

  loadBooks() {
    this.bookService.getBooks()
      .then((res) => {
        this.books = res.library.map((bookData:any) => ({ //desestructuramos el objeto y le añadimos la propiedad desired
          ...bookData.book,
          desired: false,
        }));
        this.booksSinFiltro = this.books; //guardamos la info también en un array auxiliar
      })
      .catch((error) => console.log(error));
  }

  searchBook() {
    if (this.tituloBuscado != '') {
      this.books = this.books.filter((el) =>
        el.title.toLowerCase().includes(this.tituloBuscado)
      );
    } else {
      this.books = this.booksSinFiltro;
    }
  }

  filterByGenre() {
    this.books = this.booksSinFiltro; //volvemos a llenar el array
    if (this.selectedGenre != 'Todos') {
      this.books = this.books.filter((el) => el.genre == this.selectedGenre);
    }
  }

  onDragStart(event:DragEvent, book:BookClass){
    this.drag.onDragStart(event, book)
  }

  onDragEnd(){
    this.books=this.drag.onDragEnd(this.books);
  }

  backToList() {
    if(this.bookEliminado!=null){
      this.books=this.arrayOperators.addLibro(this.books, this.bookEliminado);
      console.log(this.books);
      
    }
  }

  
}
