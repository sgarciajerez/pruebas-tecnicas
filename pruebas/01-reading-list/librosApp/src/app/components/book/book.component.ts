import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookClass } from 'src/app/models/bookClass.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  @Input() book!:BookClass;
  @Output() eliminado = new EventEmitter<BookClass>();
  protected desired:boolean=false;


  ngOnInit(): void {
    this.checkDesired();
  }

  checkDesired(){
    if(this.book.desired){
      this.setDesired(true);
    } else{
      this.setDesired(false);
    }
  }
    
    
  setDesired(boolean:boolean){
    this.desired=boolean;
  }

  backToNormalList(){
    this.eliminado.emit(this.book);
  }


  

}
