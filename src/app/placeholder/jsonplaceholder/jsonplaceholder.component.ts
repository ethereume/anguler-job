import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Posts } from 'src/app/objects/objet';
import { PlaceholderService } from '../placeholder.service';

@Component({
  selector: 'app-jsonplaceholder',
  templateUrl: './jsonplaceholder.component.html',
  styleUrls: ['./jsonplaceholder.component.scss']
})
export class JsonplaceholderComponent implements OnInit,AfterViewInit {

  public posts:Posts[] = [];
  public displayedColumns: String[] = ['id', 'userId', 'title', 'body'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.posts);

  constructor(private placeholder:PlaceholderService) { }

  ngOnInit(): void {
    //this.paginator._intl.itemsPerPageLabel="Test String";
    this.placeholder.getPosts().subscribe(it => {
      this.posts = it;
      this.dataSource.data = it;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
