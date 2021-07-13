import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor() { }
  public text:String = "asdasdsad";
  public show:boolean = false;

  ngOnInit(): void {
  }

  setText(toShow:String) {
    this.text = toShow;
  }
  setShow(show:boolean) {
    this.show = show;
  }
  setShowAndHide(toShow:String,time:number):Observable<boolean> {
    return new Observable(observable => {
        this.text = toShow;
        this.show = true;
        setTimeout(() => {
          observable.next(true);
        },time);

        return {
          unsubscribe() {
            this.show = false;
          }
        };
    });
  }
}
