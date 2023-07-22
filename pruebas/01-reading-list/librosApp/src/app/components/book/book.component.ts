import { Component, Input } from '@angular/core';
import { BookClass } from 'src/app/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent {
  @Input() book!:BookClass;
}
