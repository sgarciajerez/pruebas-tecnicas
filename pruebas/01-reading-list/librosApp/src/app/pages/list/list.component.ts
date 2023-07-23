import { Component, Input, OnInit } from '@angular/core';
import { BookClass } from 'src/app/models/book.model';
import { ArrayBookService } from 'src/app/services/array-book.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() book!:BookClass;
  
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
  private draggingBook: BookClass | null = null;

  constructor(private bookService: BookService, private arrayOperators:ArrayBookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  get totalLibros(): number { //con este getter leo la longitud del array y si hay cambios
    return this.books.length;
  }

  loadBooks() {
    this.bookService.getBooks()
      .then((res) => {
        this.books = res.library;
        this.books.map((el, index) => {
          this.books[index] = el.book; //nos sirve para eliminar el parámetro book del json
        });
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
    this.draggingBook=book;
    event.dataTransfer?.setData('application/json', JSON.stringify(book)); 
  }

  onDragEnd() {
    console.log(this.draggingBook);
    if (this.draggingBook) {
      const index = this.books.findIndex((book) => book.ISBN === this.draggingBook?.ISBN);
      if (index !== -1) {
        this.books.splice(index, 1);
      }
      this.draggingBook = null;
    }
  }

  onDrop(event: DragEvent) {
    if(this.draggingBook){
      this.draggingBook=null;
    }
  }

  onDragOver (event:DragEvent){
    event.preventDefault();  
  }


  
}
