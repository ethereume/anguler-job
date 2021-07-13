import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../objects/objet';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  constructor(private http:HttpClient,
              private fire:AngularFirestore) { }
  
  public getPosts() {
    let posts1 = this.http.get<Posts[]>("https://jsonplaceholder.typicode.com/posts");
    let posts2 = this.fire.collection<Posts>("posts").valueChanges();
    return combineLatest([posts1, posts2]).pipe(map(it => it.reduce((acc,value) => [...acc,...value],[].sort())));
  }

  public getPost(id:number) {
    return this.http.get<Posts>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  public deletePost(id:number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

}
