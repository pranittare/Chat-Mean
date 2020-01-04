import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../posts.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  @ViewChild('f',{static:false}) slForm: NgForm;
  subscription: Subscription
  editmode = false;
  editedItemIndex: number;
  editedItem: Post
  constructor(private postService: PostsService) { }

  ngOnInit() {
    // this.subscription = this.postService.startedEditing.subscribe(
    //   (index: number) =>{
    //     this.editedItemIndex = index;
    //     this.editmode = true;
    //     this.editedItem = this.postService.getPost(index);

        

      }
    
 

  }



