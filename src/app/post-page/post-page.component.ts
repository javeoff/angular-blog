import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { fbCreateResponse, Post } from "src/app/shared/interfaces";
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$?: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {    
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      }))
  }
}
