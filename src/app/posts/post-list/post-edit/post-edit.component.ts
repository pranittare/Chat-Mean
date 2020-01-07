import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../posts.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from '../../post.model';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  @ViewChild('f',{static:false}) slForm: NgForm;
  subscription: Subscription
  editmode = false;
  editedItemIndex: string;
  editedItem: Post
  content: string


  constructor(private postService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      if (params.get('postId')) {
        this.editedItemIndex = params.get('postId');
        console.warn(`editedItemIndex: ${this.editedItemIndex}`)
        // const content = this.postService.getPost(this.editedItemIndex)
        this.postService.getPost(this.editedItemIndex)
        this.editmode = !this.editmode
       
      }
    })
      }
      onEditItem(f) {
        const value = f.value
        if (value) {
          console.log(value)
          this.postService.updatePost(this.editedItemIndex, value);
        }
      }
 

  }



