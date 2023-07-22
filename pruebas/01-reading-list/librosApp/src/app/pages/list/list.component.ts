import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  
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

  constructor(private bookService: BookService) {}

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
  
}
