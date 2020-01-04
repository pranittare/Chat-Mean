import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { post } from 'selenium-webdriver/http';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //    'This is the first post',
  //    'This is the Second post',
  //    'This is the Third post',
  // ]
  onClicked = false;
  posts: Post[] = [];
  index: number;
  private postSub: Subscription;
  isLoading = false;
  itemClicked = '';
 
  post: Post[];

  private mode = 'create';
  postId: string;
 
  constructor(public postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();

    this.postSub = this.postsService.getPostUpdateListner()
      .subscribe((posts: Post[]) =>{
        this.isLoading = false;

        this.posts = posts;
      })
  }

  // onEdit(id: string) {
    // console.dir(index)
    // this.onClicked = true;
    // if (this.onClicked) {
    //   this.postsService.updatePost(index,'sada')
    // }
    // console.log('post list working')
    // this.route.paramMap.subscribe((paramMap: ParamMap) =>{
    //   if (paramMap.has('postId')) {
    //     this.mode = 'edit'
    //     this.postId = paramMap.get('postId')
    //     console.log('post create')

    //     this.post = this.postsService.getPost(this.postId);
    //   } else {
    //     this.mode = 'create'
    //     this.postId = null;

    //   }
    // });
  // }
  doubleClick(index) {
    this.itemClicked = index
   this.onClicked = !this.onClicked
    // this.postsService.doubleClicked(postId);
    // this.postsService.getPost(post_id)
    
    console.log(index);
    // console.dir(e)

    // console.log(this.onClicked)
    // this.onEdit(index);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId)
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
