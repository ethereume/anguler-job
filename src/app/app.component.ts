import { Component,OnInit, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router) {}

  private _bredcrumb: String[] = [];

  ngOnInit(): void {
    this.router.events.pipe(filter(it => it instanceof NavigationEnd),map(it => (it as NavigationEnd).urlAfterRedirects))
    .subscribe(it => {
      this.fillBredcrumb();
      it.substring(1).split("/").forEach(t => this._bredcrumb.push(t));
    });
  }

  get bredcrumb():String[] {
    return this._bredcrumb;
  }

  private fillBredcrumb() {
    this._bredcrumb = [];
    this._bredcrumb.push('locahost');
  }
  
}
