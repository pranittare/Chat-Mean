import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

 private posts: Post[] = [];
 private posts1: Post[] = [
  //  new Post('', '')
 ] 
 startedEditing = new Subject<any>();
 private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    // return [...this.posts];
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts/')
      .pipe(map((postData) =>{
        return postData.posts.map(post =>{
          return {
            content: post.content,
            id: post._id
          }
        })
        
      }))
      .subscribe((transformedPosts) =>{
        console.log(transformedPosts);
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts])
      });
  }
  getPost(id: string) {
    console.log('working')

    // return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string, content: string}>('http://localhost:3000/api/posts' + id)
  }

  getPostUpdateListner() {
    return this.postsUpdated.asObservable();
  }

  addPost(content: string) {
    const post: Post = {id: null, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts/', post)
      .subscribe((responseData)  =>{
        // console.log(responseData.message);
        const id = responseData.postId
        post.id = id
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })
   

  }
  updatePost(id: string, content:string) {
    const post: Post = {id: id, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        console.log(response)
          // const updatedPosts = [...this.posts];
          // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id)
          // updatedPosts[oldPostIndex] = post;
          // this.posts = updatedPosts;
          // console.log(content)

          // this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);

        }
        );

  }
  // updatePost(id: string, newPost:Post) {
  // this.posts1[id] = newPost;
  // this.postsUpdated.next(this.posts1.slice());

  // }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/'+ postId )
      .subscribe(() =>{
        const updatedPosts = this.posts.filter(post =>
          post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
      })
  }


  doubleClicked(id: string) {
    return this.http.get<{_id: string}>('http://localhost:3000/api/posts' + id)
  }
}
