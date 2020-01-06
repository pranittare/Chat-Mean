import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  onClicked = false;
  posts: Post[] = [];
  index: number;
  private postSub: Subscription;
  isLoading = false;
  itemClicked = '';
 
  post: Post[];

  private mode = 'create';
  postId: string;
 
  constructor(public postsService: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();

    this.postSub = this.postsService.getPostUpdateListner()
      .subscribe((posts: Post[]) =>{
        this.isLoading = false;

        this.posts = posts;
      })
  }


  doubleClick(index, post: string) {
    this.itemClicked = index
   this.onClicked = !this.onClicked
    this.router.navigate(['/edit','postid'])
    
    console.log(index);
    // console.dir(e)



  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId)
  }


  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
