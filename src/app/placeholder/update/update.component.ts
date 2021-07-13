import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/objects/objet';
import { PlaceholderService } from '../placeholder.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public labelTextarea = "Edytuj zawartość";
  public labelTitle = "Edytuj tytuł";
  public LabeluserIdTitle = "Edytuj numer uzytkownika";
  public id:String;
  public body: String;
  public title: String;
  public userId: number;
  public titleComponent:String;
  private exists:boolean = false;
  @ViewChild("tost") input: ToastComponent;

  constructor(
              private placeholder:PlaceholderService,
              private route:ActivatedRoute,
              private router:Router,
              private fire:AngularFirestore  ) { }

  public post:Posts = null;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fire.collection<Posts>('posts',ref => ref.where("id", "==", this.id)).valueChanges().subscribe(post => {
      console.log(post);
      if(post && post.length === 1) {
        this.body = post[0].body;
        this.title = post[0].title;
        this.userId = +post[0].userId;
        this.exists = true;
      } else {
          this.placeholder.getPost(+this.id).subscribe(it => {
            this.post = it;
            this.body = it.body;
            this.title = it.title;
            this.userId = +it.userId;
            this.exists = false;
          });
      }
      this.titleComponent = `Aktualizacja postu ${this.id}`;
    });
  }

  public onSubmit(f:NgForm) {
    if(this.exists) {
      this.fire.collection<Posts>('posts',ref => ref.where("id", "==", this.id)).get().subscribe(it => {
        this.fire.collection<Posts>('posts').doc(it.docs[0].id).update({
          id: +this.id,
          userId: String(this.userId),
          title: this.title,
          body: this.body
        }).then(r => {
          this.input.setShowAndHide("Poprawno zaktualizowano element",1800).subscribe(it => {
            this.router.navigate(["/dashboard"]);
          });
        });
      });
    } else {
      this.fire.collection('posts').add({
        id:this.id,
        userId:this.userId,
        title: this.title,
        body: this.body
      }).then(r => {
        this.input.setShowAndHide("Poprawno zaktualizowano element",1800).subscribe(it => {
          this.router.navigate(["/dashboard"]);
        });
      },err => console.log(err))
      .catch(err=> console.log(err));
    }
    this.reset();
  }
  private reset(): void {
    this.id = null,
    this.userId = null;
    this.title = null;
    this.body = null;
    this.exists = false;
  }

}
