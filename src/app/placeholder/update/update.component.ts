import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Posts } from 'src/app/objects/objet';
import { PlaceholderService } from '../placeholder.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public labelTextarea = "Edytuj zawartość";
  public labelTitle = "Edytuj tytuł";
  public LabeluserIdTitle = "Edytuj numer uzytkownika";
  public body: String;
  public title: String;
  public userId: number;
  public titleComponent:String;

  constructor(
              private placeholder:PlaceholderService,
              private route:ActivatedRoute,
              private fire:AngularFirestore  ) { }

  public post:Posts = null;
  ngOnInit(): void {
      this.placeholder.getPost(Number.parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(it => {
        this.post = it;
        this.body = it.body;
        this.title = it.title;
        this.userId = +it.userId;
        this.titleComponent = `Aktualizacja postu ${it.id}`
      });
  }

  public onSubmit(f:NgForm) {
    this.fire.collection('posts').add({
      userId:this.userId,
      title: this.title,
      body: this.body
    }).then(it => {
      console.log('Dodano post !!!');
    },err => console.log(err))
    .catch(err=> console.log(err));
  }

}
