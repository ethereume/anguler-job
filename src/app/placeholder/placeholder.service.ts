import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../objects/objet';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
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
    return combineLatest([posts1, posts2]).pipe(map(it => {
        let ids = it[1].map(it => +it.id);
        let posts = it[0].filter(it => !ids.includes(it.id));
        return [...posts,...it[1]].sort((t1,t2) => t1.id - t2.id);
    }));
  }

  public getPost(id:number) {
    return this.http.get<Posts>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  public deletePost(id:number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

}
