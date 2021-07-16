import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Posts } from 'src/app/objects/objet';
import { PlaceholderService } from '../placeholder.service';
import { ToastComponent } from '../toast/toast.component';


@Component({
  selector: 'app-jsonplaceholder',
  templateUrl: './jsonplaceholder.component.html',
  styleUrls: ['./jsonplaceholder.component.scss']
})
export class JsonplaceholderComponent implements OnInit,AfterViewInit {

  private showLetter = 45;
  public posts:Posts[] = [];
  public showSpinner = false;
  public clickedRows:number[] = [];
  public pageSizes:number[] = [5,10,15,20];
  public displayedColumns: String[] = ['id', 'userId', 'title', 'body',"update","delete"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("tost") input: ToastComponent;

  dataSource = new MatTableDataSource(this.posts);

  constructor(private placeholder:PlaceholderService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.placeholder.getPosts().subscribe(it => {
      this.posts = it;
      this.dataSource.data = it;
      this.showSpinner = false;
    },err => console.log(err))
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public collapse(row:Posts) {
    let id = row.id;
    if(row.body.length > 45 && this.clickedRows.indexOf(id) == -1) {
      this.clickedRows.push(row.id);
    } else {
        let indexToRemove = this.clickedRows.indexOf(id);
        this.clickedRows.splice(indexToRemove,1);
    }
  }

  public generatePipeLetter(id:number) {
    return this.clickedRows.indexOf(id) == -1 ? this.showLetter : -1; 
  }

  public update(e,id:number) {
    e.stopPropagation();
    let itemTooUpdate = this.posts.filter(it => it.id === id).map(it => it.id);
    this.router.navigate(['update',itemTooUpdate[0]], {relativeTo: this.route});
  }

  public showTost(test:string,timeout:number) {
    this.input.setText(test);
    this.input.setShow(true);
    setTimeout(() => {
      this.input.setShow(false);
    },timeout);
  }

  public delete(e,id:number) {
    e.stopPropagation();
    let indexToRemove = this.posts.findIndex(it => it.id === id);
    this.posts.splice(indexToRemove,1);
    this.dataSource.data = this.posts;
    this.placeholder.deletePost(indexToRemove).subscribe(it => this.showTost(`Poprawno usunięto post ${id}`,1800));
  }

}
