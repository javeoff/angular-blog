import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  searchStr = ''
  posts: Post[] = []
  pSub!: Subscription
  dSub!: Subscription

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.danger('Пост был удален')
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
