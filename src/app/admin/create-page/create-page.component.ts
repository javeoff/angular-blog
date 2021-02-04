import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup

  constructor(
    private router: Router,
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  submit() {
    console.log(this.form);
    
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text
    }

    this.postsService.create(post).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
      this.alert.success('Пост был создан')
    })
  }
}
