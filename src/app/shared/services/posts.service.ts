import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { fbCreateResponse } from "src/app/shared/interfaces";
import { Post } from "../interfaces";

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(
        private http: HttpClient
    ) {}

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
        .pipe(
            map((res: fbCreateResponse) => {
                return {
                    ...post,
                    id: res.name
                }
            })
        )
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
        .pipe(
            map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key
                    }))
                return []
            })
        )
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
        .pipe(
            map((post: Post) => ({
                    ...post, id
            }))
        )
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
    }
}