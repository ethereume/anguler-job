import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from 'src/app/objects/objet';
import { PlaceholderService } from '../placeholder.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private placeholder:PlaceholderService,private route:ActivatedRoute ) { }

  public post:Posts = null;
  ngOnInit(): void {
      this.placeholder.getPost(Number.parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(it => this.post = it);
  }

}
