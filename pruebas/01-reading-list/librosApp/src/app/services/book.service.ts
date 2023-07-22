import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private JSON_URL ='../assets/public/books.json';
 
  constructor(private httpClient:HttpClient) { }

  getBooks():Promise<any> {
    return this.httpClient.get<any>(this.JSON_URL).toPromise();
  }
}
