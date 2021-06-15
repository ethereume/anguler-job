import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../objects/objet';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  constructor(private http:HttpClient) { }
  
  public getPosts() {
    return this.http.get<Posts[]>("https://jsonplaceholder.typicode.com/posts");
  }

}
