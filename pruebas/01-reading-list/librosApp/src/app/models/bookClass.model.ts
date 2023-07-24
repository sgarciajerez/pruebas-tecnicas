import { Book, Author } from "./book.model";

export class BookClass implements Book {
  title!: string;
  pages!: number;
  genre!: string;
  cover!: string;
  synopsis!: string;
  year!: number;
  ISBN!: string;
  author!: Author;
  desired:boolean=false;


  //propiedad agregada

  //métodos agregados a las interfaces
  isDesired(desired:boolean){
    this.desired=desired;
  }

  getDesired():boolean{
    return this.desired;
  }

}