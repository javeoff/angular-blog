import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: Post
  uSub!: Subscription
  submitted = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        author: new FormControl(post.author, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService.update({
      id: this.post.id,
      text: this.form.value.text,
      title: this.form.value.title,
      author: this.form.value.author
    })
    .subscribe(() => {
      this.submitted = false
      this.router.navigate(['/admin','dashboard'])
      this.alert.warning('Пост был изменен')
    })
  }

}
